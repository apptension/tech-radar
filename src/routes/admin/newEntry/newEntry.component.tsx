import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { useContentfulData } from '../../../shared/hooks/useContentfulData/useContentfulData';
import { AlternativesTableType } from '../adminPanel/adminPanel.types';
import { ROUTES } from '../../app.constants';
import homeMessages from '../../home/home.messages';
import { postEntry, postImage } from '../../../shared/services/api/endpoints';
import { useAdminPanelContext } from '../../../shared/components/adminPanel/adminPanelContext';
import { TOption } from '../../../shared/components/fields/SelectField/SelectField.component';
import { TextField } from '../../../shared/components/fields/TextField';
import { FileDropField } from '../../../shared/components/fields/FileDropField';
import { SelectField } from '../../../shared/components/fields/SelectField';
import adminMessages from '../adminPanel/adminPanel.messages';
import newEntryMessages from './newEntry.messages';
import {
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
  const { user } = useAdminPanelContext();
  const intl = useIntl();
  const { radarQuadrants, radarRings, radarTeams } = useContentfulData();

  // Index needed for react-select components to reset to defaultValue
  const [selectIndex, setSelectIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const userEmail = user?.email || '';

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
          const { data } = await postImage(icon, userEmail);
          return data.fileId;
        }
      };
      const iconId = await postIcon(data.icon);
      const entry = prepareNewEntry(data, iconId);

      await postEntry(entry, userEmail);
      alert('Entry created!');
      reset();
      setSelectIndex((index) => index + 1);
    } catch (err) {
      setIsError(true);
    }
    setLoading(false);
  };

  const quadrantsOptions = getQuadrantOptions(radarQuadrants);
  const ringsOptions = getRingsOptions(radarRings);
  const teamsOptions = getTeamsOptions(radarTeams);
  const movedOptions = getMovedOptions(intl);

  return (
    <div>
      <CenteredWrapper>
        <StyledLink to={ROUTES.adminPanel}>
          <FormattedMessage {...homeMessages.goToAdminPanel} />
        </StyledLink>
        <SecondHeader>{intl.formatMessage(newEntryMessages.title)}</SecondHeader>
        {isError && <p>{intl.formatMessage(newEntryMessages.networkError)}</p>}
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
          <TextField
            label={intl.formatMessage(adminMessages.description)}
            error={errors.description?.message}
            {...register('description')}
          />
          <TextField
            label={intl.formatMessage(adminMessages.specification)}
            error={errors.specification?.message}
            {...register('specification')}
          />
          <TextField
            label={intl.formatMessage(adminMessages.github)}
            error={errors.github?.message}
            {...register('github')}
          />
          <TextField
            label={intl.formatMessage(adminMessages.projects)}
            error={errors.projects?.message}
            {...register('projects')}
          />
          <TextField
            label={intl.formatMessage(adminMessages.experts)}
            error={errors.experts?.message}
            {...register('experts')}
          />

          <Controller
            control={control}
            name="icon"
            render={({ field }) => (
              <FileDropField
                label={intl.formatMessage(adminMessages.icon)}
                infoText={intl.formatMessage(adminMessages.dragIconInfoText)}
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
                label={intl.formatMessage(newEntryMessages.moved)}
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
                label={intl.formatMessage(adminMessages.quadrant)}
                error={errors.quadrant?.message}
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
                label={intl.formatMessage(adminMessages.ring)}
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
                label={intl.formatMessage(adminMessages.team)}
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

          <SubmitButton type="submit" isLoading={isLoading}>
            {intl.formatMessage(newEntryMessages.create)}
          </SubmitButton>
        </StyledForm>
      </CenteredWrapper>
    </div>
  );
};
