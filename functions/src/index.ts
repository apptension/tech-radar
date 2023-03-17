import * as functions from 'firebase-functions';
import * as cors from 'cors';
import {
  changeEntryFields,
  checkUser,
  convertEntryFields,
  createEntryFields,
  getEnvironment,
  getQueryContentfulConfig,
  prepareIcon,
} from './utils/contentful';
import { CONTENT_TYPE_ID, DEFAULT_LOCALE } from './constants';
import { parseFile } from './utils/parseFile';
import { EntryFieldsData } from './types';

const corsHandler = cors({
  origin: [
    'https://deploy-preview-127--tech-radar-2021.netlify.app/admin/login',
    'https://feature-tra-220-skills-matrix--tech-radar-2021.netlify.app',
  ],
});

export const getLastUpdate = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const contentfulConfg = getQueryContentfulConfig(req);
      const environment = await getEnvironment(contentfulConfg);
      res.json({ success: true, dataUpdatedAt: environment.sys.updatedAt });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  });
});

export const verifyUser = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const isVerified = await checkUser(req);
    if (isVerified) {
      return res.json({ success: true });
    }
    return res.status(401).json({ success: false });
  });
});

export const deleteEntry = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const contentfulConfg = getQueryContentfulConfig(req);
      const { id } = req.body as { id: string };
      const environment = await getEnvironment(contentfulConfg);
      const entry = await environment.getEntry(id);

      const unpublishedEntry = await entry.unpublish();
      unpublishedEntry.delete();
      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  });
});

export const updateEntry = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const isVerifiedUser = await checkUser(req);
    if (!isVerifiedUser) {
      return res.status(401).json({ success: false });
    }
    try {
      const contentfulConfg = getQueryContentfulConfig(req);
      const { editedEntry, entryId } = req.body as { editedEntry: EntryFieldsData; entryId: string };
      const environment = await getEnvironment(contentfulConfg);
      const entry = await environment.getEntry(entryId);

      const fields = convertEntryFields(editedEntry);
      changeEntryFields(entry, fields);
      const updatedEntry = await entry.update();
      await updatedEntry.publish();
      return res.json({ success: true, entry });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  });
});

export const uploadEntryImage = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const isVerifiedUser = await checkUser(req);
    if (!isVerifiedUser) {
      return res.status(401).json({ success: false });
    }
    try {
      const contentfulConfg = getQueryContentfulConfig(req);
      const { entryId, imageId } = req.body as { entryId: string; imageId: string };
      const environment = await getEnvironment(contentfulConfg);
      const entry = await environment.getEntry(entryId);

      entry.fields.icon = {
        [DEFAULT_LOCALE]: prepareIcon(imageId),
      };
      const updatedEntry = await entry.update();
      await updatedEntry.publish();
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  });
});

export const uploadImage = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const isVerifiedUser = await checkUser(req);
    if (!isVerifiedUser) {
      return res.status(401).json({ success: false });
    }
    try {
      const contentfulConfg = getQueryContentfulConfig(req);
      const { file, fileName, fileType } = await parseFile(req.headers, req.body);
      const environment = await getEnvironment(contentfulConfg);

      const asset = await environment.createAssetFromFiles({
        fields: {
          title: {
            [DEFAULT_LOCALE]: fileName,
          },
          description: {
            [DEFAULT_LOCALE]: fileName,
          },
          file: {
            [DEFAULT_LOCALE]: {
              contentType: fileType,
              fileName,
              file,
            },
          },
        },
      });
      const localisedAsset = await asset.processForAllLocales();
      const result = await localisedAsset.publish();
      return res.json({ success: true, fileId: result.sys.id });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  });
});

export const createEntry = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const isVerifiedUser = await checkUser(req);
    if (!isVerifiedUser) {
      return res.status(401).json({ success: false });
    }
    try {
      const contentfulConfg = getQueryContentfulConfig(req);
      const { entryData } = req.body as { entryData: EntryFieldsData };
      const environment = await getEnvironment(contentfulConfg);

      const fields = createEntryFields(convertEntryFields(entryData));
      const entry = await environment.createEntry(CONTENT_TYPE_ID.entry, { fields });
      const publishedEntry = await entry.publish();
      return res.json({ success: true, entry: publishedEntry });
    } catch (err) {
      return res.status(400).json({ success: false });
    }
  });
});
