import TeamList from "./components/team-list";

const TeamsPage = () => {
  // useEffect(() => {
  //   const fetchTeams = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_REACT_BASE_URL}/teams`);
  //       setTeams(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       setTeams([]);
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTeams();
  // }, []);

  return (
    <div className='flex-1'>
      <TeamList />
    </div>
  );
};

export default TeamsPage;
