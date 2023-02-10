import {
  getEnvironment,
  prepareAlternativesArray,
  prepareIcon,
  prepareReference,
} from '../../shared/components/adminPanelTable/adminPanelTable.utils';
import { contentfulConfig, contentTypeId } from '../../shared/services/api/contentful';
import { EditedEntry } from '../adminPanel/adminPanel.types';
import { NewEntryInputs } from './newEntry.component';

export const createEntry = (entry: EditedEntry) => {
  getEnvironment(contentfulConfig)
    .then(async (environment) => {
      const {
        alternatives,
        description,
        experts,
        github,
        label,
        icon: { id },
        quadrant,
        ring,
        specification,
        team,
        moved,
      } = entry;

      return await environment.createEntry(contentTypeId.entry, {
        fields: {
          alternatives: {
            'en-US': prepareAlternativesArray(alternatives),
          },
          description: {
            'en-US': description,
          },
          experts: {
            'en-US': experts,
          },
          github: {
            'en-US': github,
          },
          label: {
            'en-US': label,
          },
          icon: {
            'en-US': prepareIcon(id),
          },
          quadrant: {
            'en-US': prepareReference(quadrant),
          },
          ring: {
            'en-US': prepareReference(ring),
          },
          specification: {
            'en-US': specification,
          },
          team: {
            'en-US': prepareReference(team),
          },
          moved: {
            'en-US': moved,
          },
        },
      });
    })
    .then((entry) => entry.publish())
    .then((entry) => console.log('Created with success!', entry))
    .catch(console.error);
};

export const prepareNewEntry = (data: NewEntryInputs, iconId: string): EditedEntry => {
  const {
    alternatives,
    description,
    experts,
    github,
    projects,
    label,
    icon,
    quadrant,
    ring,
    specification,
    team,
    moved,
  } = data;

  return {
    alternatives,
    description,
    experts,
    github,
    projects,
    label,
    icon: {
      id: iconId,
      name: icon[0].name,
      description: '',
      url: '',
    },
    quadrant,
    ring,
    specification,
    team,
    moved: parseInt(moved),
  };
};
