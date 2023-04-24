import { useState } from 'react';
import { useIntl } from 'react-intl';
import { reportError } from '../../../shared/utils/reportError';
import { patchEntry } from '../../../shared/services/api/endpoints/contentful';
import { useAdminPanelContext } from '../../../shared/components/adminPanel/adminPanelContext';
import { Button } from '../../../shared/components/button';
import { FileDropField } from '../../../shared/components/fields/FileDropField';
import { RadarProject, RadarQuadrant, RadarRing, RadarTeam } from '../../../shared/components/radar/radar.types';
import { SelectField } from '../../../shared/components/fields/SelectField';
import {
  HEIGHT,
  StyledSelect,
  FileDropContainer,
} from '../../../shared/components/adminPanel/adminPanelTable/adminPanelTable.styles';
import { useToast } from '../../../shared/components/toast';
import { EditableCell } from '../../../shared/components/table/table.component';
import { EditedEntry, TechnologyTable } from './adminPanel.types';
import messages from './adminPanel.messages';

interface CreateTechnologiesColumnsProps {
  radarTeams: RadarTeam[];
  radarQuadrants: RadarQuadrant[];
  radarRings: RadarRing[];
  radarProjects: RadarProject[];
}

export const useTechnologiesColumns = ({
  radarTeams,
  radarQuadrants,
  radarRings,
  radarProjects,
}: CreateTechnologiesColumnsProps) => {
  const intl = useIntl();
  const { user } = useAdminPanelContext();
  const toast = useToast();

  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const handleEdit = async (values: EditedEntry) => {
    setLoadingIds((ids) => [...ids, values.id!]);
    try {
      await patchEntry(values, user?.email || '');
      toast.success('Entry updated!');
    } catch (err) {
      toast.error('Entry failed to update');
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
          Cell: ({ value, updateMyData, row, column }) => (
            <EditableCell
              value={value}
              column={column}
              row={row}
              updateMyData={updateMyData}
              placeholder="https://github.com/"
            />
          ),
        },
        {
          Header: intl.formatMessage(messages.projects),
          accessor: 'projects',
          Cell: ({ value, updateMyData, row: { id }, column: { Header } }) => (
            <SelectField
              label=""
              styles={{ container: (base) => ({ ...base, minWidth: 350 }) }}
              isMulti
              options={radarProjects.map(({ id, name }) => ({ label: name, value: id }))}
              onChange={(newValue) => updateMyData(parseInt(id), Header, newValue)}
              value={value}
            />
          ),
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
          accessor: 'teams',
          Cell: ({ value, updateMyData, row: { id }, column: { Header } }) => (
            <SelectField
              label=""
              styles={{ container: (base) => ({ ...base, minWidth: 350 }) }}
              isMulti
              options={radarTeams.map(({ id, name }) => ({ label: name, value: id }))}
              onChange={(newValue) => updateMyData(parseInt(id), Header, newValue)}
              value={value}
            />
          ),
        },
        {
          Header: intl.formatMessage(messages.save),
          accessor: 'save',
          Cell: ({ row: { values } }) => (
            <Button
              isLoading={loadingIds.includes(values.id)}
              onClick={() =>
                handleEdit({
                  ...values,
                  teams: values.teams.map(({ value }: { value: string }) => value),
                  projects: values.projects.map(({ value }: { value: string }) => value),
                })
              }
            >
              {intl.formatMessage(messages.save)}
            </Button>
          ),
        },
      ],
    },
  ];

  return technologiesColumns;
};
