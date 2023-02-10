import { useHistory } from 'react-router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../../shared/components/radar/radar.types';
import { InlineSelectContainer } from '../../shared/components/adminPanelTable/adminPanelTable.styles';
import { uploadImageToContentfulAPI } from '../../shared/components/uploadImage/uploadImage.utils';
import { AlternativesTableType } from '../adminPanel/adminPanel.types';
import { ROUTES } from '../app.constants';
import messages from '../home/home.messages';
import { createEntry, prepareNewEntry } from './newEntry.utils';
import {
  CenteredWrapper,
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledSelect,
  StyledSubmitButton,
} from './newEntry.styles';

export type NewEntryInputs = {
  label: string;
  quadrant: string;
  ring: string;
  description: string;
  specification: string;
  github: string;
  projects: string;
  icon: FileList;
  alternatives: AlternativesTableType[];
  experts: string;
  team: string;
  moved: string;
};

export const NewEntry = () => {
  const token = sessionStorage.getItem('accessToken');
  const history = useHistory();
  const { radarTechnologies, radarQuadrants, radarRings, radarTeams } = useContentfulData();
  const options = radarTechnologies?.map((tech: RadarTechnology) => ({ value: tech.id, ...tech }));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEntryInputs>();

  const onSubmit: SubmitHandler<NewEntryInputs> = async (data) => {
    const { icon } = data;
    const iconId = await uploadImageToContentfulAPI(icon[0]);
    const entry = prepareNewEntry(data, iconId!);

    createEntry(entry);
  };

  if (!token) history.push(ROUTES.login);

  return (
    <CenteredWrapper>
      <Link to={ROUTES.adminPanel}>
        <FormattedMessage {...messages.goToAdminPanel} />
      </Link>
      <p>Add new entry to conentful</p>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel>Label</StyledLabel>
        <StyledInput {...register('label')} />
        <StyledLabel>Quadrant</StyledLabel>
        <StyledSelect {...register('quadrant')}>
          {radarQuadrants?.map(({ id, name }: RadarQuadrant) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </StyledSelect>
        <StyledLabel>Ring</StyledLabel>
        <StyledSelect {...register('ring')}>
          {radarRings?.map(({ id, name }: RadarRing) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </StyledSelect>
        <StyledLabel>Moved</StyledLabel>
        <StyledInput {...register('moved')} />
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
          render={({ field, formState }) => (
            <InlineSelectContainer>
              <Select isMulti options={options} {...field} isSearchable classNamePrefix="react-select" />
            </InlineSelectContainer>
          )}
        />
        <StyledLabel>Experts</StyledLabel>
        <StyledInput {...register('experts')} />
        <StyledLabel>Team</StyledLabel>
        <StyledSelect {...register('team')}>
          {radarTeams?.map(({ id, name }: RadarTeam) => (
            <option key={name} value={id}>
              {name}
            </option>
          ))}
        </StyledSelect>
        <StyledSubmitButton type="submit" />
      </StyledForm>
    </CenteredWrapper>
  );
};
