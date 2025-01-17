import { useParams } from 'react-router-dom'

const NationalParkPage = () => {
    const params = useParams();

    if (params.parkname === undefined) {
        window.location.href = "/error";
        return;
    }

    const parkName: string = params.parkname;

  return (
    <div>
      
    </div>
  )
}

export default NationalParkPage
