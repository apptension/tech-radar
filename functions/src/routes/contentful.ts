import * as functions from 'firebase-functions';
import {
  changeEntryFields,
  checkUser,
  convertEntryFields,
  createEntryFields,
  getEnvironment,
  getQueryContentfulConfig,
  prepareIcon,
} from '../utils/contentful';
import { CONTENT_TYPE_ID, DEFAULT_LOCALE } from '../constants';
import { parseFile } from '../utils/parseFile';
import { EntryFieldsData } from '../types';
import { getContentfulClient } from '../services/contentful';
import { SECRET_KEYS } from '../constants/secretKeys';
import { corsHandler } from '../utils/corsHandler';

export const getLastUpdate = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      try {
        const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
        const contentfulConfg = getQueryContentfulConfig(req);
        const environment = await getEnvironment(client, contentfulConfg);
        res.json({ success: true, dataUpdatedAt: environment.sys.updatedAt });
      } catch (err) {
        res.status(400).json({ success: false });
      }
    });
  });

export const verifyUser = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
      const isVerified = await checkUser(client, req);
      if (isVerified) {
        return res.json({ success: true });
      }
      return res.status(401).json({ success: false });
    });
  });

export const deleteEntry = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      try {
        const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
        const contentfulConfg = getQueryContentfulConfig(req);
        const { id } = req.body as { id: string };
        const environment = await getEnvironment(client, contentfulConfg);
        const entry = await environment.getEntry(id);

        const unpublishedEntry = await entry.unpublish();
        unpublishedEntry.delete();
        res.json({ success: true });
      } catch (err) {
        res.status(400).json({ success: false });
      }
    });
  });

export const updateEntry = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
      const isVerifiedUser = await checkUser(client, req);
      if (!isVerifiedUser) {
        return res.status(401).json({ success: false });
      }
      try {
        const contentfulConfg = getQueryContentfulConfig(req);
        const { editedEntry, entryId } = req.body as { editedEntry: EntryFieldsData; entryId: string };
        const environment = await getEnvironment(client, contentfulConfg);
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

export const uploadEntryImage = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
      const isVerifiedUser = await checkUser(client, req);
      if (!isVerifiedUser) {
        return res.status(401).json({ success: false });
      }
      try {
        const contentfulConfg = getQueryContentfulConfig(req);
        const { entryId, imageId } = req.body as { entryId: string; imageId: string };
        const environment = await getEnvironment(client, contentfulConfg);
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

export const uploadImage = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
      const isVerifiedUser = await checkUser(client, req);
      if (!isVerifiedUser) {
        return res.status(401).json({ success: false });
      }
      try {
        const contentfulConfg = getQueryContentfulConfig(req);
        const { file, fileName, fileType } = await parseFile(req.headers, req.body);
        const environment = await getEnvironment(client, contentfulConfg);

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

export const createEntry = functions
  .runWith({ secrets: [SECRET_KEYS.CONTENTFUL_TOKEN, SECRET_KEYS.WEBAPP_URL] })
  .https.onRequest(async (req, res) => {
    corsHandler(process.env.WEBAPP_URL || '')(req, res, async () => {
      const client = getContentfulClient(process.env[SECRET_KEYS.CONTENTFUL_TOKEN] || '');
      const isVerifiedUser = await checkUser(client, req);
      if (!isVerifiedUser) {
        return res.status(401).json({ success: false });
      }
      try {
        const contentfulConfg = getQueryContentfulConfig(req);
        const { entryData } = req.body as { entryData: EntryFieldsData };
        const environment = await getEnvironment(client, contentfulConfg);

        const fields = createEntryFields(convertEntryFields(entryData));
        const entry = await environment.createEntry(CONTENT_TYPE_ID.entry, { fields });
        const publishedEntry = await entry.publish();
        return res.json({ success: true, entry: publishedEntry });
      } catch (err) {
        return res.status(400).json({ success: false });
      }
    });
  });
