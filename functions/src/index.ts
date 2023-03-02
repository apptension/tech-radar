import * as functions from 'firebase-functions';
import * as cors from 'cors';

import {
  getEnvironment,
  getQueryContentfulConfig,
  prepareAlternativesArray,
  prepareIcon,
  prepareReference,
} from './utils/contentful';
import { CONTENT_TYPE_ID, DEFAULT_LOCALE } from './constants';
import { parseFile } from './utils/parseFile';

const corsHandler = cors({ origin: `${process.env.WEBAPP_URL}` });

export const getLastUpdate = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { space, environment } = getQueryContentfulConfig(req);
    getEnvironment({ space, environment })
      .then((enviroment) => res.json({ success: true, dataUpdatedAt: enviroment.sys.updatedAt }))
      .catch((err) => {
        res.status(400).json({ success: false });
      });
  });
});

export const deleteEntry = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { space, environment } = getQueryContentfulConfig(req);
    const { id } = req.body;
    getEnvironment({ space, environment })
      .then((enviroment) => enviroment.getEntry(id))
      .then(async (entry) => await entry.unpublish())
      .then((entry) => entry.delete())
      .then((entry) => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ success: false });
      });
  });
});

export const updateEntry = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { space, environment } = getQueryContentfulConfig(req);
    const { editedEntry } = req.body;
    await getEnvironment({ space, environment })
      .then((environment) => environment.getEntry(editedEntry.id))
      .then(async (entry) => {
        const { alternatives, description, experts, github, label, icon, quadrant, ring, specification, team } =
          editedEntry;

        if (alternatives?.length) entry.fields.alternatives[DEFAULT_LOCALE] = prepareAlternativesArray(alternatives);
        if (description) entry.fields.description[DEFAULT_LOCALE] = description;
        if (experts) entry.fields.experts[DEFAULT_LOCALE] = experts;
        if (github) entry.fields.github[DEFAULT_LOCALE] = github;
        entry.fields.label[DEFAULT_LOCALE] = label;
        entry.fields.quadrant[DEFAULT_LOCALE] = prepareReference(quadrant);
        entry.fields.ring[DEFAULT_LOCALE] = prepareReference(ring);
        if (specification) entry.fields.specification[DEFAULT_LOCALE] = specification;
        if (team) entry.fields.team[DEFAULT_LOCALE] = prepareReference(team);
        if (icon) entry.fields.icon[DEFAULT_LOCALE] = prepareIcon(icon.id);

        return await entry.update();
      })
      .then(async (entry) => await entry.publish())
      .then((entry) => {
        res.json({ success: true, entry });
      })
      .catch((err) => {
        res.status(400).json({ success: false });
      });
  });
});

export const uploadEntryImage = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { space, environment } = getQueryContentfulConfig(req);
    const { entryId, imageId } = req.body;
    getEnvironment({ space, environment })
      .then((environment) => environment.getEntry(entryId))
      .then(async (entry) => {
        entry.fields.icon[DEFAULT_LOCALE] = prepareIcon(imageId);
        return await entry.update();
      })
      .then(async (entry) => await entry.publish())
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ success: false });
      });
  });
});

export const uploadImage = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { space, environment } = getQueryContentfulConfig(req);
    const { file, fileName, fileType } = await parseFile(req.headers, req.body);

    await getEnvironment({ space, environment })
      .then((environment) =>
        environment.createAssetFromFiles({
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
                fileName: fileName,
                file,
              },
            },
          },
        })
      )
      .then((asset) => asset.processForAllLocales())
      .then(async (asset) => {
        const result = await asset.publish();
        res.json({ success: true, fileId: result.sys.id });
      })
      .catch((err) => {
        res.status(400).json({ success: false });
      });
  });
});

export const createEntry = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    const { space, environment } = getQueryContentfulConfig(req);
    const { entry } = req.body;
    await getEnvironment({ space, environment })
      .then(async (environment) => {
        const { alternatives, description, experts, github, label, icon, quadrant, ring, specification, team, moved } =
          entry;

        return await environment.createEntry(CONTENT_TYPE_ID.entry, {
          fields: {
            alternatives: {
              [DEFAULT_LOCALE]: prepareAlternativesArray(alternatives),
            },
            description: {
              [DEFAULT_LOCALE]: description,
            },
            experts: {
              [DEFAULT_LOCALE]: experts,
            },
            github: {
              [DEFAULT_LOCALE]: github,
            },
            label: {
              [DEFAULT_LOCALE]: label,
            },
            icon: {
              [DEFAULT_LOCALE]: prepareIcon(icon?.id),
            },
            quadrant: {
              [DEFAULT_LOCALE]: prepareReference(quadrant),
            },
            ring: {
              [DEFAULT_LOCALE]: prepareReference(ring),
            },
            specification: {
              [DEFAULT_LOCALE]: specification,
            },
            team: {
              [DEFAULT_LOCALE]: prepareReference(team),
            },
            moved: {
              [DEFAULT_LOCALE]: moved,
            },
          },
        });
      })
      .then((entry) => entry.publish())
      .then(() => {
        res.json({ success: true, entry });
      })
      .catch((err) => {
        res.status(400).json({ success: false });
      });
  });
});
