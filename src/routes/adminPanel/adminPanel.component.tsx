import { useMemo } from 'react';
import Select from 'react-select';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../../shared/components/radar/radar.types';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { AdminPanelTable } from './adminPanelTable';
import { HEIGHT, InlineSelectContainer, StyledSelect } from './adminPanelTable/adminPanelTable.styles';
import { TechnologyTable } from './adminPanel.types';

export const AdminPanel = () => {
  const { radarTechnologies, radarTeams, radarQuadrants, radarRings } = useContentfulData();

  const extendedRadarTechnologies = radarTechnologies?.map((tech: RadarTechnology) => {
    const {
      icon: { description, name, url },
    } = tech;

    return {
      ...tech,
      iconDescription: description,
      iconName: name,
      iconUrl: url,
    };
  });

  const technologiesColumns: TechnologyTable[] = useMemo(
    () => [
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

              return (
                <StyledSelect
                  value={value}
                  onChange={(e) => {
                    const {
                      target: { value },
                    } = e;
                    updateMyData(parseInt(id), Header, value);
                  }}
                >
                  {radarQuadrants?.map(({ position, name }: RadarQuadrant) => {
                    return (
                      <option key={name} value={position} selected={position === value}>
                        {name}
                      </option>
                    );
                  })}
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

              return (
                <StyledSelect
                  value={value}
                  onChange={(e) => {
                    const {
                      target: { value },
                    } = e;
                    updateMyData(parseInt(id), Header, value);
                  }}
                >
                  {radarRings?.map(({ position, name }: RadarRing, index: number) => {
                    return (
                      <option key={name} value={index} selected={position === value}>
                        {name}
                      </option>
                    );
                  })}
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
            Header: 'iconDescription',
            accessor: 'iconDescription',
          },
          {
            Header: 'iconName',
            accessor: 'iconName',
          },
          {
            Header: 'iconUrl',
            accessor: 'iconUrl',
            Cell: (row) => {
              const { value } = row;
              return <img src={value} alt="img" height={HEIGHT} />;
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
                      const updatedData = data.map((item) => {
                        delete item.value;
                        return item;
                      });
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

              return (
                <StyledSelect
                  value={value}
                  onChange={(e) => {
                    const {
                      target: { value },
                    } = e;
                    updateMyData(parseInt(id), Header, value);
                  }}
                >
                  {radarTeams?.map(({ name }: RadarTeam) => {
                    return (
                      <option key={name} value={name} selected={name === value}>
                        {name}
                      </option>
                    );
                  })}
                </StyledSelect>
              );
            },
          },
        ],
      },
    ],
    []
  );

  return <AdminPanelTable columns={technologiesColumns} rows={extendedRadarTechnologies} />;
};
