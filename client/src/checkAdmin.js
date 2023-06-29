module.exports = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/v1/is_admin', {
            headers: {Authorization: `${token}`}
        });
        const parseRes = await response.json();
        if (parseRes.is_admin) 
            return true;
        else 
        return false;

    } catch (err) {
        console.error(err.message);
        return false;
    }
}