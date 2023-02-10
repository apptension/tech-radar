import { AlternativesTableType, EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { contentfulConfig, ContentfulConfigType, managementClient } from '../../services/api/contentful';

export const getEnvironment = (contentfulConfig: ContentfulConfigType) =>
  managementClient.getSpace(contentfulConfig.space).then((space) => space.getEnvironment(contentfulConfig.environment));

export const updateEntry = async (editedEntry: EditedEntry) =>
  await getEnvironment(contentfulConfig)
    .then((environment) => environment.getEntry(editedEntry.id!))
    .then(async (entry) => {
      const { alternatives, description, experts, github, label, icon, quadrant, ring, specification, team } =
        editedEntry;

      if (alternatives?.length) entry.fields.alternatives['en-US'] = prepareAlternativesArray(alternatives);
      if (description) entry.fields.description['en-US'] = description;
      if (experts) entry.fields.experts['en-US'] = experts;
      if (github) entry.fields.github['en-US'] = github;
      entry.fields.label['en-US'] = label;
      entry.fields.quadrant['en-US'] = prepareReference(quadrant);
      entry.fields.ring['en-US'] = prepareReference(ring);
      if (specification) entry.fields.specification['en-US'] = specification;
      if (team) entry.fields.team['en-US'] = prepareReference(team);
      if (icon) entry.fields.icon['en-US'] = prepareIcon(icon.id);

      return await entry.update();
    })
    .then(async (entry) => await entry.publish())
    .then(() => alert(`Entry updated.`))
    .catch((err) => console.log('Error: ', err?.message));

export const deleteEntry = (id: string) =>
  getEnvironment(contentfulConfig)
    .then((enviroment) => enviroment.getEntry(id))
    .then(async (entry) => await entry.unpublish())
    .then((entry) => entry.delete())
    .then(() => alert('Entry deleted'))
    .catch((err) => console.debug('Error: ', err));

export const uploadImage = (entryId: string, imageId: string) => {
  getEnvironment(contentfulConfig)
    .then((environment) => environment.getEntry(entryId))
    .then(async (entry) => {
      entry.fields.icon['en-US'] = prepareIcon(imageId);
      return await entry.update();
    })
    .then(async (entry) => await entry.publish())
    .then(() => alert(`Entry updated.`))
    .catch((err) => console.debug(err));
};

export const prepareAlternativesArray = (alternatives: AlternativesTableType[]) =>
  alternatives?.map(({ id }: AlternativesTableType) => ({
    sys: {
      id,
      linkType: 'Entry',
      type: 'Link',
    },
  }));

export const prepareIcon = (id?: string) => ({
  sys: {
    id: id ? id : '',
    linkType: 'Asset',
    type: 'Link',
  },
});

export const prepareReference = (reference: string) => ({
  sys: {
    id: reference,
    type: 'Link',
    linkType: 'Entry',
  },
});
