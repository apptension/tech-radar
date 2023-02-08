import { contentfulConfig, managementClient } from '../../services/api/contentful';
import { ContentfulTechnology, RadarTechnology } from '../radar/radar.types';

export const createTechnologiesRows = (technologies: ContentfulTechnology[]) => {
  const arrayOfObjects = Object.values(technologies).flat();

  return arrayOfObjects?.map((tech: ContentfulTechnology) => ({
    id: tech.sys.id,
    ...tech.fields,
  }));
};

export const updateEntry = (editedEntry: any) =>
  managementClient
    .getSpace(contentfulConfig.space)
    .then((space) => space.getEnvironment(contentfulConfig.environment))
    .then((environment) => environment.getEntry(editedEntry.id))
    .then(async (entry) => {
      const { alternatives, description, experts, github, label, quadrant, ring, specification, team } = editedEntry;

      entry.fields.alternatives['en-US'] = prepareAlternativesArray({ alternatives });
      entry.fields.description['en-US'] = description;
      entry.fields.experts['en-US'] = experts;
      entry.fields.github['en-US'] = github;
      entry.fields.label['en-US'] = label;
      entry.fields.quadrant['en-US'] = prepareReference(quadrant);
      entry.fields.ring['en-US'] = prepareReference(ring);
      entry.fields.specification['en-US'] = specification;
      entry.fields.team['en-US'] = prepareReference(team);
      await entry.update();
      publishEntry(editedEntry);
    })
    .then((entry) => alert(`Entry updated.`))
    .catch(console.error);

export const publishEntry = (editedEntry: any) =>
  managementClient
    .getSpace(contentfulConfig.space)
    .then((space) => space.getEnvironment(contentfulConfig.environment))
    .then((environment) => environment.getEntry(editedEntry.id))
    .then(async (entry) => {
      return await entry.publish();
    })
    .catch((err) => console.log('Mariusz error'));

export const deleteEntry = (editedEntry: any) =>
  managementClient
    .getSpace(contentfulConfig.space)
    .then((space) => space.getEnvironment(contentfulConfig.environment))
    .then((enviroment) => enviroment.getEntry(editedEntry.id))
    .then((entry) => entry.delete())
    .then(() => alert('Entry deleted'))
    .catch((err) => console.log('Error: ', err));

export const prepareAlternativesArray = ({ alternatives }: any) =>
  alternatives?.map(({ id }: RadarTechnology) => {
    return {
      sys: {
        id,
        linkType: 'Entry',
        type: 'Link',
      },
    };
  });

export const prepareIcon = ({ icon }: any) => {
  console.log('Mariusz icon: ', icon);
  return {
    sys: {
      id: icon.url,
      linkType: 'Asset',
      type: 'Link',
    },
  };
};

export const prepareReference = (reference: any) => {
  const id = reference?.sys?.id || reference;
  return {
    sys: {
      id,
      type: 'Link',
      linkType: 'Entry',
    },
  };
};
