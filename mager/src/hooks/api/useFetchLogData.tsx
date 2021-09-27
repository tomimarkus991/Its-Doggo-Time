// import { useEffect, useState } from 'react';
// import { useGroup } from '../../context';
// import { GroupPageDataType } from '../../types';
// import { supabase } from '../../utils/supabaseClient';

// export const useFetchLogData = (group_id: string) => {
//   const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//       const fetchLogData = async () => {
//         try {
//           setIsLogdataLoading(true);
//           let { data } = await supabase
//             .from('logs')
//             .select(
//               `
//               id,
//               created_at,
//               pee,
//               poop
//           `,
//             )
//             .eq('id', log_id)
//             .single();

//           let _logData: LogsdataType = data;

//           const { created_at, pee, poop } = _logData;

//           setTime(created_at);

//           // setPee(pee);
//           // setPoop(poop);
//           // if (pee && poop) {
//           //   setLogData(['pee', 'poop']);
//           //   // let newArr = [...businesses];
//           //   // newArr[0] = { value: 'pee', hasDuty: true };
//           //   // setBusinesses(newArr);
//           // }
//           if (pee) {
//             setLogData((oldData: any) => [...oldData, 'pee']);
//             // setLogData(['pee']);
//           }
//           if (poop) {
//             setLogData((oldData: any) => [...oldData, 'poop']);
//             // setLogData(['poop']);
//           }
//         } catch (error) {
//           throw error;
//         } finally {
//           setIsLogdataLoading(false);
//         }
//       };
//       fetchLogData();
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//   return { isLoading };
// };
