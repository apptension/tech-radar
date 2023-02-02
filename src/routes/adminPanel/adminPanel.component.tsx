import { useMemo } from 'react';
import Select from 'react-select';
import { AdminPanelTable } from './adminPanelTable';
import { HEIGHT, InlineSelectContainer, StyledSelect } from './adminPanelTable/adminPanelTable.styles';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../../shared/components/radar/radar.types';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
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
              const { value } = row;
              return (
                <StyledSelect value={value}>
                  {!!radarQuadrants &&
                    radarQuadrants.map(({ position, name }: RadarQuadrant) => {
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
              const { value } = row;
              return (
                <StyledSelect
                  value={value}
                  onChange={(e) => {
                    console.log(e);
                  }}
                >
                  {!!radarRings &&
                    radarRings.map(({ position, name }: RadarRing, index: number) => {
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
              const { value } = row;
              const selected = value?.map(({ id, label }: RadarTechnology) => ({ value: id, label }));
              const options = radarTechnologies?.map(({ id, label }: RadarTechnology) => ({ value: id, label }));

              return (
                <InlineSelectContainer>
                  <Select defaultValue={selected} isMulti options={options} classNamePrefix="react-select" />
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
              const { value } = row;
              return <input type="checkbox" id="inactive" name="inactive" value={value} />;
            },
          },
          {
            Header: 'ringLabel',
            accessor: 'ringLabel',
            Cell: (row) => {
              const { value } = row;
              return <p>{value}</p>;
            },
          },
          {
            Header: 'team',
            accessor: 'team',
            Cell: (row) => {
              const { value } = row;
              return (
                <StyledSelect
                  value={value}
                  onChange={(e) => {
                    console.log(e);
                  }}
                >
                  {!!radarTeams &&
                    radarTeams.map(({ name }: RadarTeam) => {
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
