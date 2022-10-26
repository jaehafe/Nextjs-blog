import Head from 'next/head';
import React from 'react';
import { getAllPostIds, getPostData } from '../../lib/posts';
import homeStyles from '../../styles/Home.module.css';
import postStyle from '../../styles/Post.module.css';

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export default Post;

// 동적 라우팅이 필요할 때, getStaticPaths로 경로 리스트를 정의하고, HTML에 build 시간에 렌더링
// Nextjs는 pre-render에서 정적으로 getStaticPaths 에서 호출하는 경로들을 가져옴
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  // [{params: {id: 'pre-rendering}, {params: ...}}]
  return {
    paths, //어떠한 경로가 pre-render 될지를 결정
    fallback: false, // getStaticPaths로 리턴되지 않는 것은 모두 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
