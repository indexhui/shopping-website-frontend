import React, { useState, useEffect, useContext } from 'react';
import { Flex, Heading, Button, Text, VStack } from '@chakra-ui/react';

import CurrentUserContext from '../../store/CurrentUserContext';

const baseURl = 'https://infinite-beach-24731.herokuapp.com/api';

const Users = () => {
  const currentUserCtx = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const getUsers = async token => {
    try {
      const res = await fetch(`${baseURl}/admin/userData`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        const data = await res.json();
        setUsers(data.result);
        console.log(data);
        return data;
      }
    } catch (error) {
      console.log('error', error);
      console.log('error message', error.message);
    }
  };

  useEffect(() => {
    const getUsers = async token => {
      try {
        const res = await fetch(`${baseURl}/admin/userData`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          const result = data.result;
          setUsers(result);
          return data;
        }
      } catch (error) {
        console.log('error', error);
        console.log('error message', error.message);
      }
    };
    getUsers(currentUserCtx.token).catch(error => {
      setIsLoading(false);
      // setHttpError(error.message);
    });
  }, []);
  return (
    <Flex>
      <Heading>User List</Heading>
      <VStack>
        {users?.map(user => (
          <Text key={user.id}>{user.name}</Text>
        ))}
      </VStack>
      <Button onClick={() => getUsers(currentUserCtx.token)}>get user</Button>
    </Flex>
  );
};
export default Users;
