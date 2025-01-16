const dateFormatter = () => {
    return new Intl.DateTimeFormat( undefined, {
        year: '2-digit',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    } ).format( new Date( Date.now() ) );
};

export default dateFormatter;