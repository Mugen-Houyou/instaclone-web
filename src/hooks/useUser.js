import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const isTokenOnLocalStorage = useReactiveVar(isLoggedInVar);
  const {data,  } = useQuery(ME_QUERY, {
    skip: !isTokenOnLocalStorage
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);// useEffect는 hook 마운트 시 한 번 실행, 이후 데이터 변경 때마다 실행.
  return;
}

export default useUser;
