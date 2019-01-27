import React, { Suspense } from 'react';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

interface PropsType {
  label: string;
}
const catchError = (
  importPromise: Promise<{
    default: React.ComponentType<any>;
  }>,
): Promise<{
  default: React.ComponentType<any>;
}> => {
  return new Promise((resolve, _) => {
    importPromise.then(resolve).catch(() => resolve({ default: ErrorOutline }));
  });
};

const RerIcon = ({ label }: PropsType) => {
  const LazyRerIcon = React.lazy(() => catchError(import(`./Rer${label}`)));
  return <LazyRerIcon />;
};

export default ({ label }: PropsType) => {
  return (
    <Suspense fallback={<div>loading..</div>}>
      <RerIcon label={'B'} />
    </Suspense>
  );
};
