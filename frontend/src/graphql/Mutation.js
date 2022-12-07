const { gql } = require('@apollo/client');

export const SIGN_IN = gql`
  mutation SIGN_IN($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
    }
  }
`;
export const SIGN_UP = gql`
  mutation SIGN_UP($email: String!, $password: String!, $display_name: String!) {
    createAccount(data: { email: $email, full_name: $display_name, password: $password, role: "user" }) {
      id
      email
      full_name
      access_token
    }
  }
`;

export const SUBMIT_CODE = gql`
  mutation SUBMIT_CODE(
    $exerciseId: String!
    $caseFailed: jsonb!
    $excuteTime: float8!
    $memory: Int!
    $point: float8!
  ) {
    resultExercise(
      data: {
        caseFailed: $caseFailed
        excuteTime: $excuteTime
        exerciseId: $exerciseId
        memory: $memory
        point: $point
      }
    )
  }
`;

export const UPDATE_CONTEST = gql`
  mutation UPDATE_CONTEST(
    $contestId: String!
    $name: String
    $des: String
    $startDate: timestamptz
    $endDate: timestamptz
    $status: String
  ) {
    update_contests_by_pk(
      pk_columns: { id: $contestId }
      _set: { name: $name, des: $des, endDate: $endDate, startDate: $startDate, status: $status }
    ) {
      id
    }
  }
`;

export const INSERT_CONTEST = gql`
  mutation INSERT_CONTEST(
    $name: String!
    $des: String!
    $startDate: timestamptz!
    $endDate: timestamptz!
    $status: String!
    $time: Int!
  ) {
    insert_contests_one(
      object: { name: $name, des: $des, endDate: $endDate, startDate: $startDate, status: $status, time: $time }
    ) {
      id
    }
  }
`;
export const UPDATE_CONTEST_LOGO = gql`
  mutation UPDATE_CONTEST_LOGO($contestId: String!, $logoUrl: String!) {
    update_contests(where: { id: { _eq: $contestId } }, _set: { logoUrl: $logoUrl }) {
      returning {
        id
        name
      }
    }
  }
`;
export const INSERT_PROBLEM = gql`
  mutation INSERT_PROBLEM(
    $name: String!
    $des: String!
    $level: Int!
    $topic: jsonb!
    $metadata: jsonb!
    $contestId: String
  ) {
    insert_exercises(
      objects: { name: $name, des: $des, level: $level, topic: $topic, metadata: $metadata, contestId: $contestId }
    ) {
      returning {
        des
        level
        name
      }
    }
  }
`;

export const UPDATE_PROBLEM = gql`
  mutation UPDATE_PROBLEM(
    $exerciseId: String!
    $name: String
    $des: String
    $level: Int
    $topic: jsonb
    $updatedAt: timestamptz
    $status: String
    $metadata: jsonb
    $contestId: String
    $challengeId: String
  ) {
    update_exercises_by_pk(
      pk_columns: { id: $exerciseId }
      _set: {
        name: $name
        des: $des
        level: $level
        topic: $topic
        updatedAt: $updatedAt
        status: $status
        metadata: $metadata
        contestId: $contestId
        challengeId: $challengeId
      }
    ) {
      id
    }
  }
`;

export const UPDATE_DISCUSS_REACT = gql`
  mutation UPDATE_DISCUSS_REACT($id: String!, $discussId: String!) {
    discussReactUpdate(data: { id: $id, discussId: $discussId })
  }
`;

export const ADD_DISCUSS = gql`
  mutation ADD_DISCUSS($exerciseId: String!, $content: String!) {
    insert_discusses_one(object: { exerciseId: $exerciseId, content: $content }) {
      createdBy
    }
  }
`;

export const APPROVED_NEW_BLOG = gql`
  mutation APPROVED_NEW_BLOG($blogID: String!) {
    update_blogs_by_pk(pk_columns: { id: $blogID }, _set: { isApproved: true }) {
      id
      isApproved
    }
  }
`;
export const REMOVE_BLOG_BY_ID = gql`
  mutation REMOVE_BLOG_BY_ID($blogID: String!) {
    delete_blogs_by_pk(id: $blogID) {
      id
    }
  }
`;

export const ADD_NEW_BLOG = gql`
  mutation ADD_NEW_BLOG($blogContent: String!, $blogTitle: String!) {
    insert_blogs(objects: { content: $blogContent, title: $blogTitle }) {
      returning {
        id
        title
        content
        isApproved
      }
    }
  }
`;

export const INSERT_COURSE = gql`
  mutation INSERT_COURSE(
    $courseName: String!
    $courseDes: String!
    $banner: String!
    $concepts: [concepts_insert_input!]!
  ) {
    insert_courses(objects: { name: $courseName, des: $courseDes, image: $banner, concepts: { data: $concepts } }) {
      returning {
        id
        name
        concepts {
          name
          des
          priority
          courseId
        }
      }
    }
  }
`;
export const INSERT_EXERCISE_CONCEPT = gql`
  mutation INSERT_EXERCISE_CONCEPT(
    $title: String!
    $content: String!
    $level: Int!
    $topic: jsonb!
    $metadata: jsonb!
    $conceptId: String
  ) {
    insert_exercises(
      objects: { conceptId: $conceptId, name: $title, des: $content, topic: $topic, level: $level, metadata: $metadata }
    ) {
      returning {
        id
        conceptId
      }
    }
  }
`;

export const UPDATE_COURSE_IMAGE = gql`
  mutation UPDATE_COURSE_IMAGE($image: String!, $courseId: String!) {
    update_courses(where: { id: { _eq: $courseId } }, _set: { image: $image }) {
      returning {
        id
      }
    }
  }
`;

export const EDIT_BLOG_BY_ID = gql`
  mutation EDIT_BLOG_BY_ID($blogID: String!, $blogTitle: String!, $blogContent: String!) {
    update_blogs_by_pk(
      pk_columns: { id: $blogID }
      _set: { title: $blogTitle, content: $blogContent, isApproved: false }
    ) {
      id
    }
  }
`;
export const UPDATE_AVATAR = gql`
  mutation UPDATE_AVATAR($userID: String!, $avatarUrl: String!) {
    update_account_by_pk(pk_columns: { id: $userID }, _set: { avatarUrl: $avatarUrl }) {
      id
      status
    }
  }
`;

export const INSERT_EXERCISE_CHALLENGE = gql`
  mutation INSERT_EXERCISE_CHALLENGE(
    $name: String!
    $des: String!
    $startDate: timestamptz!
    $endDate: timestamptz
    $metadata: jsonb!
    $topic: jsonb!
    $desExercise: String!
    $level: Int!
  ) {
    insert_challenges(
      objects: {
        name: $name
        des: $des
        startDate: $startDate
        endDate: $endDate
        exercises: { data: { level: $level, metadata: $metadata, name: $name, topic: $topic, des: $desExercise } }
      }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_CHALLENGE_IMAGE = gql`
  mutation UPDATE_CHALLENGE_IMAGE($image: String!, $challengeId: String!) {
    update_challenges(where: { id: { _eq: $challengeId } }, _set: { image: $image }) {
      returning {
        id
      }
    }
  }
`;

export const INSERT_CONTEST_RESULT = gql`
  mutation INSERT_CONTEST_RESULT($contestId: String!, $exerciseId: String!, $point: Int!, $completionTime: Int!) {
    insert_contest_results(
      objects: { contestId: $contestId, exerciseId: $exerciseId, point: $point, completionTime: $completionTime }
    ) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_CHALLENGE = gql`
  mutation UPDATE_CHALLENGE(
    $challengeId: String!
    $name: String!
    $status: String!
    $des: String
    $startDate: timestamptz
    $endDate: timestamptz
  ) {
    update_challenges(
      where: { id: { _eq: $challengeId } }
      _set: { name: $name, status: $status, des: $des, startDate: $startDate, endDate: $endDate }
    ) {
      returning {
        id
      }
    }
  }
`;
