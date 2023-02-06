import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../../shared/components/radar/radar.types';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { ROUTES } from '../app.constants';
import { Login } from '../login';
import { AdminPanelTable } from './adminPanelTable';
import { HEIGHT, InlineSelectContainer, StyledSelect } from './adminPanelTable/adminPanelTable.styles';
import { TechnologyTable } from './adminPanel.types';

export const AdminPanel = () => {
  const [token, setToken] = useState(sessionStorage.getItem('accessToken'));
  const { radarTechnologies, radarTeams, radarQuadrants, radarRings } = useContentfulData();
  const history = useHistory();

  // useEffect(() => {
  //   const handleStorage = (event: StorageEvent) => {
  //     console.log("🚀 ~ file: adminPanel.component.tsx:16 ~ handleStorage ~ event", event)
  //     if (event.key === 'accessToken') {
  //       setToken(event.newValue);
  //     }
  //   };

  //   window.addEventListener('storage', handleStorage);
  //   return () => {
  //     window.removeEventListener('storage', handleStorage);
  //   };
  // }, []);

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
                      <option key={name} value={position}>
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
                      <option key={name} value={index}>
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
                      <option key={name} value={name}>
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
    [extendedRadarTechnologies]
  );

  console.log('🚀 ~ file: adminPanel.component.tsx:254 ~ AdminPanel ~ token', token);

  if (!token) history.push(ROUTES.login);

  if (extendedRadarTechnologies.length === 0) return <p>Data not found...</p>;

  return <AdminPanelTable columns={technologiesColumns} rows={extendedRadarTechnologies} />;
};
