import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase';
import { user } from 'firebase-functions/lib/providers/auth';
import fire from '../config/Fire';
import * as admin from 'firebase-admin';


class ProtectedRoute extends React.Component {

    render() {
        
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('MmY3OWRiZjY0ZjhjO');     
        const tok = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkNTU0ZjBjMTJjNjQ3MGZiMTg1MmY3OWRiZjY0ZjhjODQzYmIxZDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGFzcmZiLTcxZGE3IiwiYXVkIjoidGFzcmZiLTcxZGE3IiwiYXV0aF90aW1lIjoxNTkzMDM0OTMzLCJ1c2VyX2lkIjoicFZYYmNpOVZ2clFrZ0pHQXNFOWVwZUFHaHNwMiIsInN1YiI6InBWWGJjaTlWdnJRa2dKR0FzRTllcGVBR2hzcDIiLCJpYXQiOjE1OTMwMzU0MzMsImV4cCI6MTU5MzAzOTAzMywiZW1haWwiOiJwYWJsb25leDc3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYWJsb25leDc3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.dsyqS7bfFGclESgZLJbnQd0_liLGbZ0RWcYHMjv4aUlgk8O0BAQYOl7crAPIVRuTNwviKkFwQkG3mzMIzvVBWDbOulVflLkPY_ICdf01iCmfHBvJNbaqqMMECcQgJD_dE0J9NKuLC9ZfLGcan42S1nZLnNlnf1GzIs-uD7RSOawnDyXPpJt_UAnB2-F0gKjzRuJeFTfwh8lt9Q7Rtq0QS4nLwVD_hvqrhryRnZ5v9168JuUw8kCA1zryqhu_X0KOzViQ-9Nc5b9GJpEXwHT8jMS4u3ETetnJwhTnjKhgElDqnwyGV-JHjWPXa9eiV33Xw94Nm0hucyUmg63pFNNMfQ"

        return (isAuthenticated===tok) ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;