import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

interface AuthContextType {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (user: any | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any;
  loading: boolean; // Add loading to the interface
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return authContext;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // if(user) window.location.assign('/');

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_BASE_URL}/auth/me`
        );
        setToken(response.data.accessToken);
        setUser(response.data.user);
        console.log(response.data.accessToken);
      } catch (error) {
        setToken(undefined);
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? `Bearer ${token}`
        : config.headers.Authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_REACT_BASE_URL}/auth/refresh`
            );
            console.log(response.data.accessToken);
            setToken(response.data.accessToken);

            originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setToken(undefined);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const value = {
    token,
    setToken,
    user,
    setUser,
    loading, // Add loading to the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
