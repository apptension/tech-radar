import Select from 'react-select';
import { AlternativesTableType, TechnologyTable } from '../../../routes/adminPanel/adminPanel.types';
import { deleteEntry, patchEntry } from '../../services/api/endpoints';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../radar/radar.types';
import { UploadImage } from '../uploadImage';
import { HEIGHT, InlineSelectContainer, StyledSelect } from './adminPanelTable.styles';

import { TableButton } from './tableButton.component';

interface CreateTechnologiesColumnsProps {
  radarTechnologies: RadarTechnology[];
  radarTeams: RadarTeam[];
  radarQuadrants: RadarQuadrant[];
  radarRings: RadarRing[];
}

export const createTechnologiesColumns = ({
  radarTechnologies,
  radarTeams,
  radarQuadrants,
  radarRings,
}: CreateTechnologiesColumnsProps) => {
  const technologiesColumns: TechnologyTable[] = [
    {
      Header: 'Admin Panel',
      columns: [
        {
          Header: 'id',
          accessor: 'id',
          Cell: ({ value }) => <p>{value}</p>,
        },
        {
          Header: 'label',
          accessor: 'label',
        },
        {
          Header: 'quadrant',
          accessor: 'quadrant',
          Cell: ({ value, updateMyData, row: { id }, column: { Header } }) => (
            <StyledSelect value={value} onChange={({ target }) => updateMyData(parseInt(id), Header, target.value)}>
              {radarQuadrants?.map(({ id, name }: RadarQuadrant) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          ),
        },
        {
          Header: 'ring',
          accessor: 'ring',
          Cell: ({ value, updateMyData, row: { id }, column: { Header } }) => (
            <StyledSelect value={value} onChange={({ target }) => updateMyData(parseInt(id), Header, target.value)}>
              {radarRings?.map(({ id, name }: RadarRing) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          ),
        },
        {
          Header: 'description',
          accessor: 'description',
        },
        {
          Header: 'specification',
          accessor: 'specification',
        },
        {
          Header: 'github',
          accessor: 'github',
        },
        {
          Header: 'projects',
          accessor: 'projects',
        },
        {
          Header: 'icon',
          accessor: 'icon',
          Cell: ({ value: { url } }) => <img src={url} alt="brak zdjęcia" height={HEIGHT} />,
        },
        {
          Header: 'iconUpload',
          accessor: 'iconUpload',
          Cell: ({ row: { values } }) => <UploadImage editedEntry={values} />,
        },
        {
          Header: 'alternatives',
          accessor: 'alternatives',
          Cell: ({ value, row: { id }, column: { Header }, updateMyData }) => {
            const defaultValue = value?.map((tech: AlternativesTableType) => ({ value: tech.id, ...tech }));
            const options = radarTechnologies?.map((tech: RadarTechnology) => ({ value: tech.id, ...tech }));

            return (
              <InlineSelectContainer>
                <Select
                  name="alternatives"
                  defaultValue={defaultValue}
                  isMulti
                  options={options}
                  onChange={(data) => {
                    const updatedData = data.map(({ description, icon, id, label }) => ({
                      description,
                      icon,
                      id,
                      label,
                    }));
                    updateMyData(parseInt(id), Header, updatedData);
                  }}
                  isSearchable
                  classNamePrefix="react-select"
                />
              </InlineSelectContainer>
            );
          },
        },
        {
          Header: 'experts',
          accessor: 'experts',
        },
        {
          Header: 'team',
          accessor: 'team',
          Cell: ({ value, updateMyData, row: { id }, column: { Header } }) => (
            <StyledSelect value={value} onChange={({ target }) => updateMyData(parseInt(id), Header, target.value)}>
              {radarTeams?.map(({ id, name }: RadarTeam) => (
                <option key={name} value={id}>
                  {name}
                </option>
              ))}
            </StyledSelect>
          ),
        },
        {
          Header: 'save',
          accessor: 'save',
          Cell: ({ row }) => <TableButton label="Save" action={() => patchEntry(row.values)} />,
        },
        {
          Header: 'delete',
          accessor: 'delete',
          Cell: ({
            row: {
              values: { id },
            },
          }) => <TableButton label="Delete" action={() => deleteEntry(id)} />,
        },
      ],
    },
  ];

  return technologiesColumns;
};
