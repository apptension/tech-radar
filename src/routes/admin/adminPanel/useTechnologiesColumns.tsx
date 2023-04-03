import { useState } from 'react';
import { useIntl } from 'react-intl';
import { reportError } from '../../../shared/utils/reportError';
import { patchEntry } from '../../../shared/services/api/endpoints/contentful';
import { useAdminPanelContext } from '../../../shared/components/adminPanel/adminPanelContext';
import { Button } from '../../../shared/components/button';
import { FileDropField } from '../../../shared/components/fields/FileDropField';
import { RadarQuadrant, RadarRing, RadarTeam } from '../../../shared/components/radar/radar.types';
import {
  HEIGHT,
  StyledSelect,
  FileDropContainer,
} from '../../../shared/components/adminPanel/adminPanelTable/adminPanelTable.styles';
import { EditedEntry, TechnologyTable } from './adminPanel.types';
import messages from './adminPanel.messages';

interface CreateTechnologiesColumnsProps {
  radarTeams: RadarTeam[];
  radarQuadrants: RadarQuadrant[];
  radarRings: RadarRing[];
}

export const useTechnologiesColumns = ({ radarTeams, radarQuadrants, radarRings }: CreateTechnologiesColumnsProps) => {
  const intl = useIntl();
  const { user } = useAdminPanelContext();

  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const handleEdit = async (values: EditedEntry) => {
    setLoadingIds((ids) => [...ids, values.id!]);
    try {
      await patchEntry(values, user?.email || '');
      alert('Entry updated!');
    } catch (err) {
      reportError(err);
    }
    setLoadingIds((ids) => ids.filter((id) => id !== values.id));
  };

  const technologiesColumns: TechnologyTable[] = [
    {
      Header: 'Admin Panel',
      columns: [
        {
          Header: intl.formatMessage(messages.id),
          accessor: 'id',
          Cell: ({ value }) => <p>{value}</p>,
        },
        {
          Header: intl.formatMessage(messages.label),
          accessor: 'label',
        },
        {
          Header: intl.formatMessage(messages.quadrant),
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
          Header: intl.formatMessage(messages.ring),
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
          Header: intl.formatMessage(messages.description),
          accessor: 'description',
        },
        {
          Header: intl.formatMessage(messages.specification),
          accessor: 'specification',
        },
        {
          Header: intl.formatMessage(messages.github),
          accessor: 'github',
        },
        {
          Header: intl.formatMessage(messages.projects),
          accessor: 'projects',
        },
        {
          Header: intl.formatMessage(messages.experts),
          accessor: 'experts',
        },
        {
          Header: intl.formatMessage(messages.icon),
          accessor: 'icon',
          Cell: ({ value: { url } }) => <img src={url} alt="brak zdjęcia" height={HEIGHT} />,
        },
        {
          Header: intl.formatMessage(messages.iconUpload),
          accessor: 'iconUpload',
          Cell: ({ value, row: { id }, updateMyData, column: { Header } }) => (
            <FileDropContainer>
              <FileDropField
                label=""
                infoText={intl.formatMessage(messages.dragIconInfoText)}
                onChange={(file: File) => updateMyData(parseInt(id), Header, file)}
                value={value}
              />
            </FileDropContainer>
          ),
        },
        {
          Header: intl.formatMessage(messages.team),
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
          Header: intl.formatMessage(messages.save),
          accessor: 'save',
          Cell: ({ row: { values } }) => {
            return (
              <Button isLoading={loadingIds.includes(values.id)} onClick={() => handleEdit(values)}>
                {intl.formatMessage(messages.save)}
              </Button>
            );
          },
        },
      ],
    },
  ];

  return technologiesColumns;
};
