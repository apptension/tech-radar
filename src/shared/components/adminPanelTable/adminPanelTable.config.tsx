import Select from 'react-select';
import { TechnologyTable } from '../../../routes/adminPanel/adminPanel.types';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology, TableRadarTechnology } from '../radar/radar.types';
import { HEIGHT, InlineSelectContainer, StyledSelect } from './adminPanelTable.styles';
import { updateEntry } from './adminPanelTable.utils';

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
          Cell: (row) => {
            const { value } = row;
            return <p>{value}</p>;
          },
        },
        {
          Header: 'label',
          accessor: 'label',
        },
        {
          Header: 'quadrant',
          accessor: 'quadrant',
          Cell: (row) => {
            const {
              value,
              updateMyData,
              row: { id },
              column: { Header },
            } = row;

            const defaultValue = value?.sys?.id;

            return (
              <StyledSelect
                value={defaultValue}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  console.log();
                  updateMyData(parseInt(id), Header, value);
                }}
              >
                {radarQuadrants?.map(({ id, name }: RadarQuadrant) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </StyledSelect>
            );
          },
        },
        {
          Header: 'ring',
          accessor: 'ring',
          Cell: (row) => {
            const {
              value,
              updateMyData,
              row: { id },
              column: { Header },
            } = row;

            const defaultValue = value?.sys?.id;

            return (
              <StyledSelect
                value={defaultValue}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  updateMyData(parseInt(id), Header, value);
                }}
              >
                {radarRings?.map(({ id, name }: RadarRing) => (
                  <option key={name} value={id}>
                    {name}
                  </option>
                ))}
              </StyledSelect>
            );
          },
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
          Cell: (row) => {
            const {
              value: { url },
            } = row;
            return <img src={url} alt="brak zdjęcia" height={HEIGHT} />;
          },
        },
        {
          Header: 'alternatives',
          accessor: 'alternatives',
          Cell: (row) => {
            const {
              value,
              updateMyData,
              row: { id },
              column: { Header },
            } = row;

            const options = radarTechnologies?.map((tech: RadarTechnology) => ({ value: tech.id, ...tech }));

            return (
              <InlineSelectContainer>
                <Select
                  defaultValue={value}
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
          Header: 'inactive',
          accessor: 'inactive',
          Cell: (row) => {
            const {
              value,
              updateMyData,
              row: { id },
              column: { Header },
            } = row;
            return (
              <input
                type="checkbox"
                id="inactive"
                name="inactive"
                onChange={(e) => {
                  const {
                    target: { checked },
                  } = e;
                  updateMyData(parseInt(id), Header, checked);
                }}
                value={value}
              />
            );
          },
        },
        {
          Header: 'team',
          accessor: 'team',
          Cell: (row) => {
            const {
              value,
              updateMyData,
              row: { id },
              column: { Header },
            } = row;

            const defaultValue = value?.sys?.id;

            return (
              <StyledSelect
                value={defaultValue}
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  updateMyData(parseInt(id), Header, value);
                }}
              >
                {radarTeams?.map(({ id, name }: RadarTeam) => (
                  <option key={name} value={id}>
                    {name}
                  </option>
                ))}
              </StyledSelect>
            );
          },
        },
        {
          Header: 'save',
          accessor: 'save',
          Cell: (rowData) => {
            const {
              row: { values },
            } = rowData;
            return <button onClick={() => updateEntry(values)}>Save</button>;
          },
        },
        {
          Header: 'delete',
          accessor: 'delete',
          Cell: (rowData) => {
            const {
              row: { values },
            } = rowData;
            // console.log('Mariusz row: ', values);
            return <button>Delete</button>;
          },
        },
      ],
    },
  ];

  return technologiesColumns;
};
