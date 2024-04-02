import http from "./http-client";

interface UserCreate {
    id: number;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    is_verified: boolean;
}

interface User {
    access_token: string;
    token_type: string;
    user_data?: UserCreate
} 

interface UserLogin { 
    username: string;
    password: string;
}

const login = async (data: UserLogin) => {
    try {
        console.log('as')
        const formData = new URLSearchParams();
        formData.append('username', data.username);
        formData.append('password', data.password);
        const response = await http.post('/auth/jwt/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const parsed = response.data;
      
        localStorage.setItem('authUser', JSON.stringify(parsed));
       
        return parsed;
    } catch (error) {
        console.error('Ошибка входа', error);
        throw error;
    }
}

const register = (data:UserCreate) => {
    return http.post('/auth/register', data);
}

const profile = () => {
    return http.get('/users/me');
}

const logout = () => {
    http.post('/auth/jwt/logout', null, {});
    localStorage.removeItem('authUser');
    window.location.reload()
}

const getAuthUser = () => {
    const item = localStorage.getItem('authUser');

    return item ? JSON.parse(item) : null;
}  

const methods = { 
    login,
    register,
    profile,
    logout,
    getAuthUser
}

export default methods;