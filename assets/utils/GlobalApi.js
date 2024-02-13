import { request, gql } from 'graphql-request'


const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/clsh78s962bdq01upcurgsv5k/master";

const getSlider=async()=>{

    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

const getCategory=async()=>{
  const query = gql`
  query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
  `
  const result = await request(MASTER_URL, query)
    return result;
}

const getBusinessList=async()=>{
  const query = gql`
  query GetBussinessList {
    businessLists {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      images {
        url
      }
      about
    }
  }
  `
  const result = await request(MASTER_URL,query);
  return result;
}

const getBusinessListByCategory=async(category)=>{
  const query = gql`
  query GetBussinessList {
    
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      images {
        url
      }
      about
    }
  }
  `
  const result = await request(MASTER_URL,query)
  return result;
}

const createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked,
         businessList: {connect: {id: "`+data.businessId+`"} },
          date: "`+data.date+`",
           time: "`+data.time+`",
            userEmail: "`+data.userEmail+`",
             userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED){
      count
    }
  }
  `
  const result = await request(MASTER_URL,mutationQuery)
  return result;
}

const getUserBookings=async(email)=>{
  const query = gql`
  query getUserBookings {
    bookings(
      orderBy: updatedAt_DESC
      where: {userEmail: "saurabhtambolkar22@gmail.com"}
    ) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businessList {
        id
        name
        address
        email
        contactPerson
        images {
          url
        }
        about
      }
    }
  }
  `
  const result = await  request(MASTER_URL,query);
  return result;
}

// const getUserBookings=async(email)=>{
//   const query = gql`
//   query getUserBookings {
//     bookings(orderBy: updatedAt_DESC, where: {userEmail: "`+email+`"}) {
//       time
//       userEmail
//       userName
//       bookingStatus
//       date
//       id
//       businessList {
//         id
//         name
//         address
//         email
//         contactPerson
//         images {
//           url
//         }
//       }
//     }
//   }
//   `
//   const result = await  request(MASTER_URL,query);
//   return result;
// }


export default {
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings

}