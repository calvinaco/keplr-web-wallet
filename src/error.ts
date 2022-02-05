const errorMessageGuard = (err: unknown, defaultMessage: string = 'unknown error'): string => {
  if (err instanceof Error) {
    return err.message;
  }

  return defaultMessage;
};

export { errorMessageGuard };
