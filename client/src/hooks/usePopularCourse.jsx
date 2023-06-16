import { useEffect, useState } from "react";

const usePopularCourse = () => {
    const [courses,setCourses] = useState([])
    const [loading,setLoading] = useState(true);
    useEffect(()=> {
        fetch("https://medlife-server-navy.vercel.app/courses")
          .then((res) => res.json())
          .then((data) => {
            setCourses(data);
            setLoading(false);
          });
      }, []);
      
      return [courses,loading]
};

export default usePopularCourse;