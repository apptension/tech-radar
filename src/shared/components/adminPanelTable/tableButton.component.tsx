import { useContentfulData } from '../../hooks/useContentfulData/useContentfulData';

interface TableButtonProps {
  label: string;
  action: () => Promise<void>;
}

export const TableButton = ({ label, action }: TableButtonProps) => {
  const { contentfulQuery } = useContentfulData();

  const handleSave = async () => {
    await action();
    contentfulQuery.refetch();
  };

  return <button onClick={handleSave}> {label} </button>;
};
