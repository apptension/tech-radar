import { useState } from 'react';
import { patchEntry } from '../../shared/services/api/endpoints';
import { Button } from '../../shared/components/button';
import { FileDropField } from '../../shared/components/fields/FileDropField';
import { RadarQuadrant, RadarRing, RadarTeam } from '../../shared/components/radar/radar.types';
import {
  HEIGHT,
  StyledSelect,
  FileDropContainer,
} from '../../shared/components/adminPanelTable/adminPanelTable.styles';
import { EditedEntry, TechnologyTable } from './adminPanel.types';

interface CreateTechnologiesColumnsProps {
  radarTeams: RadarTeam[];
  radarQuadrants: RadarQuadrant[];
  radarRings: RadarRing[];
}

export const useTechnologiesColumns = ({ radarTeams, radarQuadrants, radarRings }: CreateTechnologiesColumnsProps) => {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const handleEdit = async (values: EditedEntry) => {
    setLoadingIds((ids) => [...ids, values.id!]);
    try {
      await patchEntry(values);
      alert('Entry updated!');
    } catch (err) {
      console.error(err);
    }
    setLoadingIds((ids) => ids.filter((id) => id !== values.id));
  };

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
          Header: 'experts',
          accessor: 'experts',
        },
        {
          Header: 'icon',
          accessor: 'icon',
          Cell: ({ value: { url } }) => <img src={url} alt="brak zdjęcia" height={HEIGHT} />,
        },
        {
          Header: 'iconUpload',
          accessor: 'iconUpload',
          Cell: ({ value, row: { id }, updateMyData, column: { Header } }) => (
            <FileDropContainer>
              <FileDropField
                label=""
                infoText="Drag 'n' drop a file here, or click to select file"
                onChange={(file: File) => updateMyData(parseInt(id), Header, file)}
                value={value}
              />
            </FileDropContainer>
          ),
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
          Cell: ({ row: { values } }) => {
            return (
              <Button isLoading={loadingIds.includes(values.id)} onClick={() => handleEdit(values)}>
                Save
              </Button>
            );
          },
        },
      ],
    },
  ];

  return technologiesColumns;
};
