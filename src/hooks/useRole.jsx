// import useAuth from './useAuth'
// import useAxiosSecure from './useAxiosSecure'
// import { useQuery } from '@tanstack/react-query'

// const useRole = () => {
//   const { user, loading } = useAuth()
//   const axiosSecure = useAxiosSecure()

//   const { data: role, isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ['role', user?.email],
//     queryFn: async () => {
//       if (!user?.email) return null // safety check
//       const result = await axiosSecure.get('/user/role')
//       return result.data.role
//     },
//   })

//   return [role, isRoleLoading]
// }

// export default useRole

// import useAuth from './useAuth'
// import useAxiosSecure from './useAxiosSecure'
// import { useQuery } from '@tanstack/react-query'

// const useRole = () => {
//   const { user, loading } = useAuth()
//   const axiosSecure = useAxiosSecure()

//   const { data: role = null, isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ['role', user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get('/user/role')
//       return data?.role ?? null
//     },
//   })

//   return [role, isRoleLoading]
// }

// export default useRole

// useRole.js
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: role = null, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      if (!user?.email) return null
      const { data } = await axiosSecure.get('/user/role') // ✅ full backend hit
      return data?.role ?? null
    },
  })

  return [role, isRoleLoading]
}

export default useRole
