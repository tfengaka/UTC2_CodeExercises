import { useQuery } from '@apollo/client';
import Helmet from 'components/Helmet';
import PageLoading from 'components/PageLoading';
import ServerError from 'components/ServerError';
import { GET_CONTEST } from 'graphql/Queries';
import { useAuth } from 'hooks/useAuth';
import { React, useState } from 'react';
import ItemContest from './ItemContest';

const Contest = () => {
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const { loading, error, data } = useQuery(GET_CONTEST);
  if (loading) return <PageLoading />;
  if (error) {
    console.error(error.message);
    return <ServerError />;
  }

  const items = data?.contests.filter((val) => {
    return val.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Helmet title="Cuộc thi">
      <div className="content animate__animated animate__fadeInDown">
        <div className="content_container">
          <div className="panel__title">Tất cả cuộc thi</div>
          <div className="panel__extra">
            <ul className="filter">
              <li>
                <div className="input__wrapper">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Từ khóa"
                  ></input>
                  <i className="bx bx-search-alt-2"></i>
                </div>
              </li>
            </ul>
          </div>
          <ItemContest contestsList={items} currUserId={user?.id} />
        </div>
      </div>
    </Helmet>
  );
};

export default Contest;
