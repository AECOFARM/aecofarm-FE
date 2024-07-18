import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = parseCookies().token;
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}

export function withAuthServerSideProps<P>(getServerSidePropsFunc?: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context);
    const token = cookies.token;

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      jwt.verify(token, 'your-secret-key');
    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (getServerSidePropsFunc) {
      return await getServerSidePropsFunc(context);
    }

    return {
      props: {} as P,
    };
  };
}
