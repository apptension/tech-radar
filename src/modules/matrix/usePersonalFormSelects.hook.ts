import { useEffect, useState } from 'react';
import { getPostions, getSeniorities } from '../../shared/services/api/endpoints/airtable';
import { reportError } from '../../shared/utils/reportError';
import { Position, Seniority } from '../../shared/components/matrix/types';

export const usePersonalFormSelects = () => {
  const [seniorityOptions, setSeniorityOptions] = useState<Seniority[]>([]);
  const [positionOptions, setPositionOptions] = useState<Position[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeniorities = async () => {
      const { data } = await getSeniorities();
      setSeniorityOptions(data.seniorities);
    };

    const fetchPositions = async () => {
      const { data } = await getPostions();
      setPositionOptions(data.positions);
    };

    const getAllData = async () => {
      try {
        await Promise.all([fetchSeniorities(), fetchPositions()]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    getAllData();
  }, []);

  return { seniorityOptions, positionOptions, isLoading };
};
