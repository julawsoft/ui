import React, { useCallback, useEffect, useState, ChangeEvent, FC, } from 'react';

import OrganizationChart from "organization-chart-react";
import "organization-chart-react/dist/style.css";

import '@xyflow/react/dist/style.css';

import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import { EmployeeManager, IEmployee } from '../../../schema/Employee'
import { Title, TitleBox, TitleValue, TitleValueIcon } from '../../EquipaRH'
import { useNavigate } from 'react-router-dom'
import { CardLargeProfile } from '../../../components/Profile/CardLargeProfile'
import { Modal } from '../../../components/Forms/Modal'
import SpinnerProgress from '../../../components/SpinnerProgress'
import { ErrorLocal } from '../../../components/ErrorLocal'
import { Select } from '../../../components/Forms/Select'
import { convertDataToSelect } from '../../../utils/convertDataToSelect'
import { toast } from 'react-toastify'
import { updateLineManager } from '../../../services/Employee/updateLineManager'
import { getEmployees } from '../../../services/Employee/get-employees.service'
import PermissionGate from '../../../hooks/permissionGate'
import { Roles } from '../../../routes/roles'
import useColabContext from '../../../context_api'
import { GroupsPermissions } from '../../../utils/groups'
import { DisplayDateString } from '../../../utils/convertDatas'


const orgDataExemplo = {
  title: "CEO",
  member: [
    {
      name: "Oliver",
      image_url:
        "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
    },
  ],
  children: [
    {
      title: "MANAGEMENT",
      member: [
        {
          name: "Jake",
          add: "Junior Staff",
          image_url:
            "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
        },
        {
          name: "Noah",
          add: "Senior Staff",
          image_url:
            "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
        },
        {
          name: "James",
          add: "Senior Manager",
          image_url:
            "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
        },
      ],
    },
    {
      title: "DEVELOPMENT",
      member: [
        {
          name: "Emma",
          add: "CTO",
          image_url:
            "https://github.com/LeeJams/LeeJams.github.io/blob/master/assets/img/user.jpg?raw=true",
        },
      ],
      children: [
        {
          title: "FRONTEND",
          titleClass: "frontend-title",
          contentClass: "frontend-content",
          member: [
            {
              name: "David",
              add: "Senior Staff",
            },
            {
              name: "Ava",
              add: "Senior Staff",
            },
            {
              name: "Sophia",
              add: "Senior Staff",
            },
          ],
        },
        {
          title: "BACKEND",
          titleClass: "backend-title",
          contentClass: "backend-content",
          member: [
            {
              name: "Kyle",
              add: "Senior Staff",
            },
            {
              name: "Richard",
              add: "Senior Staff",
            },
            {
              name: "Daniel",
              add: "Senior Staff",
            },
          ],
        },
      ],
    },
    {
      title: "DESIGN",
      member: [
        {
          name: "Jacob",
          add: "Senior Staff",
        },
      ],
    },
    {
      title: "MARKETING",
    },
    {
      title: "SALES",
      children: [
        {
          title: "SALES A TEAM",
        },
        {
          title: "SALES B TEAM",
        },
      ],
    },
  ],
};


const CpompanyOrganograma = () => {
  const navigate = useNavigate()

  const handleLink = (url: string, params) => {
    navigate(url, { state: { ...params } })
  }

  const { colabProvider } = useColabContext()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false)
  const [data, setData] = useState<IEmployee[]>([])
  const [idSHSelected, setIdSHSelected] = useState<number>(0)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const getListEmployees = () => {
    setIsLoadingModal(true)
    setTimeout(async () => {
      try {
        const response = await getEmployees({
          departmants: undefined,
          categories: undefined,
          status: undefined,
          employee: undefined,
        })
        // setData(removeEmployeeIntList([], response))
        setIsLoadingModal(false)
      } catch (error) {
        setMessage(String(error))
        setIsError(true)
        toast.error(String(error))
      } finally {
        setIsLoadingModal(false)
      }
    }, 1000)
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: string = e.target.value
    setIdSHSelected(Number(value))
  }

  const handleReload = () => {
    getListEmployees()
  }

  const buttonAction = () => {
    getListEmployees()
    setIsOpen(true)
  }

  const [orgData, setOrgData] = useState({
    ...orgDataExemplo
  });
  const onClickNode = (data) => {
    console.log(data);
  }



  return (
    <Box mt={5}>
      <Grid templateColumns="2fr 1fr" gap={8} width={'100%'}>
        <Box>
          <OrganizationChart data={orgData} onClickNode={onClickNode} />
        </Box>
      </Grid>
    </Box>
  )
}

export default CpompanyOrganograma
