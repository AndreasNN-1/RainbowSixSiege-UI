import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const useRequstData = () => {

    const [ isLoading, setIsLoading ] = useState( false )
    
    const [ data, setData ] = useState( null )
    
    const [ error, seterror ] = useState( false )

    const makeRequest = async ( url, method = "GET" ) => {

        let response
        setIsLoading( true )

        try {

            response = await axios.get(url)

            if( response && response.data !== undefined ) {

                setData( response.data )
                seterror( false )

            } else {

                seterror( true )
                setData( null )
                throw new Error( "FEJL: L" )

            }

        } catch (error) {

            seterror( true )
            setData( null )
            console.log( error )

        } finally {

         setIsLoading( false )
         console.log("SLUT")

        }

    }




    return{ makeRequest, isLoading, data, error }
}

export default useRequstData