"use client";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SignupSchema from '@schemas/signup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('/api/signup', values);
      console.log(response.data);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  Username
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="username"
                />
                <ErrorMessage className="text-red-500 text-xs italic mt-1" name="username" component="div" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  name="password"
                />
                <ErrorMessage className="text-red-500 text-xs italic mt-1" name="password" component="div" />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                type="submit"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button onClick={() => router.push('/login')} className="text-blue-600 hover:text-blue-700 font-semibold">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
