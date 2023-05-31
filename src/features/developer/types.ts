export type persoForm = {
  firstname: string;
  lastname: string;
  birthday: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  portfolio: string;
  userid: string;
};

export type eduForm = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
  userid?: string;
};

export type proForm = {
  title: string;
  description: string;
  demo_link: string;
  code_repo: string;
  userId?: string;
};
