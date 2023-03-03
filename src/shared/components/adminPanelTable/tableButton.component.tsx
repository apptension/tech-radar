import { useContentfulData } from '../../hooks/useContentfulData/useContentfulData';

interface TableButtonProps {
  label: string;
  action: () => Promise<any>;
}

export const TableButton = ({ label, action }: TableButtonProps) => {
  const { contentfulQuery } = useContentfulData();

  const handleSave = async () => {
    try {
      await action();
      contentfulQuery.refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleSave}> {label} </button>;
};
