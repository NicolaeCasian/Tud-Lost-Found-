export const getAccountFromLocalStorage = (): { email: string; name?: string } | null => {
    const account = localStorage.getItem('account');
    return account ? JSON.parse(account) : null;
};