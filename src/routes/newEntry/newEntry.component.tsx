import { useHistory } from 'react-router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../../shared/components/radar/radar.types';
import { InlineSelectContainer } from '../../shared/components/adminPanelTable/adminPanelTable.styles';
import { AlternativesTableType } from '../adminPanel/adminPanel.types';
import { ROUTES } from '../app.constants';
import messages from '../home/home.messages';
import { postImage } from '../../shared/services/api/endpoints';
import { createEntry, prepareNewEntry } from './newEntry.utils';
import {
  CenteredWrapper,
  SecondHeader,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledLink,
  StyledParagraph,
  StyledSelect,
  StyledSubmitButton,
  TextError,
} from './newEntry.styles';

export type NewEntryInputs = {
  label: string;
  quadrant: string;
  ring: string;
  description: string;
  specification: string;
  github: string;
  projects: string;
  icon?: FileList;
  alternatives: AlternativesTableType[];
  experts: string;
  team: string;
  moved: string;
};

export const NewEntry = () => {
  const token = sessionStorage.getItem('accessToken');
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  const history = useHistory();
  const { radarTechnologies, radarQuadrants, radarRings, radarTeams } = useContentfulData();
  const options = radarTechnologies?.map((tech: RadarTechnology) => ({ value: tech.id, ...tech }));

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEntryInputs>();

  const onSubmit: SubmitHandler<NewEntryInputs> = async (data) => {
    setLoading(true);
    const { icon } = data;
    let iconId: string | undefined = undefined;

    if (icon?.length) {
      const { data } = await postImage(icon[0]);
      iconId = data.fileId;
    }

    const entry = prepareNewEntry(data, iconId);

    const result = await createEntry(entry);
    if (result) reset();
    setLoading(false);
  };

  if (!token) history.push(ROUTES.login);

  return (
    <div>
      <CenteredWrapper>
        <StyledLink to={ROUTES.adminPanel}>
          <FormattedMessage {...messages.goToAdminPanel} />
        </StyledLink>
        <SecondHeader>Add new entry to conentful</SecondHeader>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel>Label</StyledLabel>
          <StyledInput
            {...register('label', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'Label is required',
                  id: 'NewEntry / Form / Label required',
                }),
              },
            })}
          />
          {errors.label && <TextError>{errors.label?.message}</TextError>}
          <StyledLabel>Quadrant</StyledLabel>
          <StyledSelect
            defaultValue=""
            {...register('quadrant', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'Quadrant is required',
                  id: 'NewEntry / Form / Quadrant required',
                }),
              },
            })}
          >
            {radarQuadrants?.map(({ id, name }: RadarQuadrant) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </StyledSelect>
          {errors.quadrant && <TextError>{errors.quadrant?.message}</TextError>}
          <StyledLabel>Ring</StyledLabel>
          <StyledSelect
            defaultValue=""
            {...register('ring', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'Ring is required',
                  id: 'NewEntry / Form / Ring required',
                }),
              },
            })}
          >
            {radarRings?.map(({ id, name }: RadarRing) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </StyledSelect>
          {errors.ring && <TextError>{errors.ring?.message}</TextError>}
          <StyledLabel>Moved (0 = circle, 1 = arrow up, -1 = arrow down)</StyledLabel>
          <StyledInput
            {...register('moved', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'Moved is required',
                  id: 'NewEntry / Form / Moved required',
                }),
              },
            })}
          />
          {errors.moved && <TextError>{errors.moved?.message}</TextError>}
          <StyledLabel>Description</StyledLabel>
          <StyledInput {...register('description')} />
          <StyledLabel>Specification</StyledLabel>
          <StyledInput {...register('specification')} />
          <StyledLabel>Github</StyledLabel>
          <StyledInput {...register('github')} />
          <StyledLabel>Projects</StyledLabel>
          <StyledInput {...register('projects')} />
          <StyledLabel>Icon</StyledLabel>
          <StyledInput type="file" {...register('icon')} />
          <StyledLabel>Alternatives</StyledLabel>
          <Controller
            control={control}
            name="alternatives"
            render={({ field }) => (
              <InlineSelectContainer>
                <Select isMulti options={options} {...field} isSearchable classNamePrefix="react-select" />
              </InlineSelectContainer>
            )}
          />
          <StyledLabel>Experts</StyledLabel>
          <StyledInput {...register('experts')} />
          <StyledLabel>Team</StyledLabel>
          <StyledSelect defaultValue="" {...register('team')}>
            {radarTeams?.map(({ id, name }: RadarTeam) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
          </StyledSelect>
          <StyledSubmitButton type="submit" />
        </StyledForm>
        {isLoading && <StyledParagraph> Entry is uploading. Please wait, it takes a few moment... </StyledParagraph>}
      </CenteredWrapper>
    </div>
  );
};
