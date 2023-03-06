import { useHistory } from 'react-router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { AlternativesTableType } from '../adminPanel/adminPanel.types';
import { ROUTES } from '../app.constants';
import messages from '../home/home.messages';
import { postEntry, postImage } from '../../shared/services/api/endpoints';
import { TOption } from '../../shared/components/fields/SelectField/SelectField.component';
import { TextField } from '../../shared/components/fields/TextField';
import { FileDropField } from '../../shared/components/fields/FileDropField';
import { SelectField } from '../../shared/components/fields/SelectField';
import {
  getAlternativesOptions,
  getMovedOptions,
  getQuadrantOptions,
  getRingsOptions,
  getTeamsOptions,
  prepareNewEntry,
} from './newEntry.utils';
import { CenteredWrapper, SecondHeader, StyledForm, StyledLink, SubmitButton } from './newEntry.styles';

export type NewEntryInputs = {
  label: string;
  quadrant: string;
  ring: string;
  description: string;
  specification: string;
  github: string;
  projects: string;
  icon?: File;
  alternatives: AlternativesTableType[];
  experts: string;
  team: string;
  moved: string;
};

export const NewEntry = () => {
  const token = sessionStorage.getItem('accessToken');
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // Index needed for react-select components to reset to defaultValue
  const [selectIndex, setSelectIndex] = useState(0);

  const history = useHistory();
  const intl = useIntl();

  const { radarTechnologies, radarQuadrants, radarRings, radarTeams } = useContentfulData();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEntryInputs>();
  const onSubmit: SubmitHandler<NewEntryInputs> = async (data) => {
    setLoading(true);
    setIsError(false);
    try {
      const postIcon = async (icon: NewEntryInputs['icon']) => {
        if (icon) {
          const { data } = await postImage(icon);
          return data.fileId;
        }
      };
      const iconId = await postIcon(data.icon);
      const entry = prepareNewEntry(data, iconId);

      await postEntry(entry);
      alert('Entry created!');
      reset();
      setSelectIndex((index) => index + 1);
    } catch (err) {
      setIsError(true);
    }
    setLoading(false);
  };

  if (!token) history.push(ROUTES.login);

  const alternativesOptions = getAlternativesOptions(radarTechnologies);
  const quadrantsOptions = getQuadrantOptions(radarQuadrants);
  const ringsOptions = getRingsOptions(radarRings);
  const teamsOptions = getTeamsOptions(radarTeams);
  const movedOptions = getMovedOptions();

  return (
    <div>
      <CenteredWrapper>
        <StyledLink to={ROUTES.adminPanel}>
          <FormattedMessage {...messages.goToAdminPanel} />
        </StyledLink>
        <SecondHeader>Add new technology</SecondHeader>
        {isError && <p>There was an error</p>}
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Label"
            error={errors.label?.message}
            {...register('label', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'This field is required',
                  id: 'NewEntry / Form / Field required',
                }),
              },
            })}
          />
          <TextField label="Description" error={errors.description?.message} {...register('description')} />
          <TextField label="Specification" error={errors.specification?.message} {...register('specification')} />
          <TextField label="Github" error={errors.github?.message} {...register('github')} />
          <TextField label="Projects" error={errors.projects?.message} {...register('projects')} />
          <TextField label="Experts" error={errors.experts?.message} {...register('experts')} />

          <Controller
            control={control}
            name="icon"
            render={({ field }) => (
              <FileDropField
                label="Icon"
                infoText="Drag 'n' drop icon file here, or click to select file"
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="moved"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'This field is required',
                  id: 'NewEntry / Form / Field required',
                }),
              },
            }}
            render={({ field }) => (
              <SelectField
                key={selectIndex}
                options={movedOptions}
                label="Moved"
                error={errors.moved?.message}
                {...field}
                onChange={(newValue, meta) => {
                  field.onChange((newValue as TOption).value, meta);
                }}
                value={movedOptions.find(({ value }) => value === +field.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="quadrant"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'This field is required',
                  id: 'NewEntry / Form / Field required',
                }),
              },
            }}
            render={({ field }) => (
              <SelectField
                key={selectIndex}
                options={quadrantsOptions}
                label="Quadrant"
                error={errors.ring?.message}
                {...field}
                onChange={(newValue, meta) => {
                  field.onChange((newValue as TOption).value, meta);
                }}
                value={quadrantsOptions.find(({ value }) => value === field.value)}
                defaultValue={quadrantsOptions.find(({ value }) => value === field.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="ring"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'This field is required',
                  id: 'NewEntry / Form / Field required',
                }),
              },
            }}
            render={({ field }) => (
              <SelectField
                options={ringsOptions}
                label="Ring"
                key={selectIndex}
                error={errors.ring?.message}
                {...field}
                onChange={(newValue, meta) => {
                  field.onChange((newValue as TOption).value, meta);
                }}
                value={ringsOptions.find(({ value }) => value === field.value)}
                defaultValue={ringsOptions.find(({ value }) => value === field.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="alternatives"
            defaultValue={[]}
            render={({ field }) => (
              <SelectField
                isMulti
                options={alternativesOptions}
                isSearchable
                label="Alternatives"
                error={errors.alternatives?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="team"
            rules={{
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'This field is required',
                  id: 'NewEntry / Form / Field required',
                }),
              },
            }}
            render={({ field }) => (
              <SelectField
                options={teamsOptions}
                label="Team"
                key={selectIndex}
                error={errors.team?.message}
                {...field}
                onChange={(newValue, meta) => {
                  field.onChange((newValue as TOption).value, meta);
                }}
                value={teamsOptions.find(({ value }) => value === field.value)}
              />
            )}
          />

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Ładowanie' : 'Utwórz'}
          </SubmitButton>
        </StyledForm>
      </CenteredWrapper>
    </div>
  );
};
