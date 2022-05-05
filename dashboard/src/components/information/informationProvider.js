import React, { useMemo, useState } from 'react';
import { InformationContext } from "./informationContext";
import { useLoader } from '../loader/useLoader';
import { useRouter } from 'next/router';
import { removeItem, setItem } from 'src/utils/persistentStorage';
import { getLastAssitances, getLastUsers, getTotalUsers } from 'src/api/requests/overview';
import { analyticsGetAssistancesByMechanic, analyticsGetAssistancesByZone, getAssistances } from "src/api/requests/assistances";
import { getUsers, getUserById, deleUserById, createMechanic } from 'src/api/requests/users';
import { loginUser, logoutUser, refreshToken } from 'src/api/requests/auth';
import { useAlert } from '../alert/useAlert';
import { getMessageToUser, handleSessionExpired } from 'src/helpers/errors';
import { analyticsGetSessions } from 'src/api/requests/sessions';

const InformationProvider = (props) => {
    const { children } = props;

    const router = useRouter();
    const { handleShowLoader } = useLoader();
    const { handleShowAlert } = useAlert();
    const okayMessage = "Operación exitosa";

    const [user, setUser] = useState();
    const [totalUsers, setTotalUsers] = useState({
        activeUsers: 0,
        deletedUsers: 0,
        newUsersInLastWeek: 0,
        totalUsers: 0
    });
    const [lastUsers, setLastUsers] = useState({});
    const [lastAsssitances, setLastAsssitances] = useState({});
    const [users, setUsers] = useState({ list: [], totalItems: 0, rowsPerPage: 0, currentPage: 1, pages: 1 });
    const [userSelectedInfo, setUserSelected] = useState({});
    const [assistances, setAssistances] = useState({ list: [], totalItems: 0, rowsPerPage: 0, currentPage: 1, pages: 1 });
    const [sessionPerDay, setSessionPerDay] = useState([]);
    const [assistancesByZone, setAssistancesByZone] = useState([]);
    const [assistancesByMechanic, setAssistancesByMechanic] = useState([]);

    const fetchIndex = async () => {
        try {
            handleShowLoader(true);
            const [totalUsers, lastUsers, lastAssistances] = await Promise.all([
                getTotalUsers(),
                getLastUsers(),
                getLastAssitances()
            ]);

            setTotalUsers(totalUsers);
            setLastUsers(lastUsers);
            setLastAsssitances(lastAssistances);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const fetchUsersWithFilter = async (data) => {
        try {
            handleShowLoader(true);
            const result = await getUsers({
                name: data?.name || "",
                role: data?.role === "all" ? "" : data?.role || "",
                rowsPerPage: data?.rowsPerPage || 7,
                page: data?.page || 1
            });
            setUsers(result);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const searchUserById = async (id) => {
        try {
            handleShowLoader(true);
            const result = await getUserById(id);
            setUserSelected(result || {});
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const changeUserStatus = async (index, id, status) => {
        try {
            handleShowLoader(true);
            const result = await deleUserById(id, status);
            const auxListUsers = [...users.list];
            auxListUsers[index] = { ...auxListUsers[index], ...result };
            setUsers({ ...users, list: auxListUsers });
            handleShowAlert(okayMessage, false);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };



    const fetchAssistancesWithFilter = async (data) => {
        try {
            handleShowLoader(true);
            const result = await getAssistances({
                name: data?.name || "",
                status: data?.status === "all" ? "" : data?.status || "",
                rowsPerPage: data?.rowsPerPage || 7,
                page: data?.page || 1
            });
            setAssistances(result);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const createNewMechanic = async (data) => {
        try {
            handleShowLoader(true);
            handleShowAlert(okayMessage, false);
            return await createMechanic(data);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const loginAuthentication = async (data) => {
        try {
            handleShowLoader(true);
            removeItem("token");
            removeItem("user");

            const result = await loginUser(data);
            setItem("token", result.token);
            setItem("user", result.user);
            setUser(result.user);

            handleShowAlert(okayMessage, false);
            return result;
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);

        } finally {
            handleShowLoader(false);
        }
    };

    const logout = async () => {
        try {
            handleShowLoader(true);
            await logoutUser();
            removeItem("token");
            removeItem("user");
            setUser(null);

            router.push("/login");
        } catch (error) {
            handleSessionExpired(error, router);
        } finally {
            handleShowLoader(false);
        }
    };

    const getAnalyticsAssistanceMechanic = async (data) => {
        try {
            handleShowLoader(true);
            const result = await analyticsGetAssistancesByMechanic({
                startDate: data?.startDate || "",
                endDate: data?.endDate || "",
            });
            setAssistancesByMechanic(result);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const getAnalyticsAssistanceZone = async (data) => {
        try {
            handleShowLoader(true);
            const result = await analyticsGetAssistancesByZone({
                startDate: data?.startDate || "",
                endDate: data?.endDate || "",
            });
            setAssistancesByZone(result);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };


    const getAnalyticsSessions = async (data) => {
        try {
            handleShowLoader(true);
            const result = await analyticsGetSessions({
                startDate: data?.startDate || "",
                endDate: data?.endDate || ""
            });
            setSessionPerDay(result);
        } catch (error) {
            handleSessionExpired(error, router);
            handleShowAlert(getMessageToUser(error), true);
        } finally {
            handleShowLoader(false);
        }
    };

    const contextValues = useMemo(() => ({
        fetchIndex,
        totalUsers,
        lastUsers,
        lastAsssitances,
        createMechanic,
        users,
        searchUserById,
        userSelectedInfo,
        fetchUsersWithFilter,
        assistances,
        fetchAssistancesWithFilter,
        searchUserById,
        changeUserStatus,
        createNewMechanic,
        loginAuthentication,
        logout,
        getAnalyticsAssistanceMechanic,
        getAnalyticsAssistanceZone,
        getAnalyticsSessions,
        sessionPerDay,
        assistancesByZone,
        assistancesByMechanic,
        users,
        user,
        refreshToken
    }), [
        fetchIndex,
        totalUsers,
        lastUsers,
        lastAsssitances,
        createMechanic,
        users,
        searchUserById,
        userSelectedInfo,
        fetchUsersWithFilter,
        assistances,
        fetchAssistancesWithFilter,
        searchUserById,
        changeUserStatus,
        createNewMechanic,
        loginAuthentication,
        logout,
        getAnalyticsAssistanceMechanic,
        getAnalyticsAssistanceZone,
        getAnalyticsSessions,
        sessionPerDay,
        assistancesByZone,
        assistancesByMechanic,
        users,
        user,
        refreshToken
    ]);

    return (
        <InformationContext.Provider value={contextValues}>
            {children}
        </InformationContext.Provider>
    );
};

export { InformationProvider };