import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Country } from '@/types';
import {
  ArrowLeft,
  MapPin,
  Globe,
  Currency,
  Languages,
  Cloud,
  Map,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      native
      capital
      emoji
      currency
      awsRegion
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

export default function CountryDetail() {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const { loading, error, data } = useQuery<{ country: Country }>(GET_COUNTRY, {
    variables: { code },
    fetchPolicy: 'cache-and-network', // Use cache first, fetch in the background
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  if (error)
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p>{error.message}</p>
        <Button onClick={handleBackClick} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-4">
      <Button onClick={handleBackClick} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Countries
      </Button>

      {loading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-full" />
            ))}
          </CardContent>
        </Card>
      ) : data?.country ? (
        <Card className="overflow-hidden">
          <CardHeader className="bg-background-muted">
            <CardTitle className="text-4xl flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{data.country.name}</h1>
                <p className="text-xl text-muted-foreground">
                  {data.country.native}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoItem
                icon={MapPin}
                label="Capital"
                value={data.country.capital || 'N/A'}
              />
              {data.country.currency ? (
                <InfoItem
                  icon={Currency}
                  label="Currency"
                  value={data.country.currency}
                />
              ) : null}
              <InfoItem
                icon={Languages}
                label="Languages"
                value={data.country.languages
                  .map((lang) => lang.name)
                  .join(', ')}
              />
              <InfoItem
                icon={Cloud}
                label="AWS Region"
                value={data.country.awsRegion || 'N/A'}
              />
              <InfoItem
                icon={Globe}
                label="Continent"
                value={data.country.continent.name}
              />
              <InfoItem
                icon={Map}
                label="Country Code"
                value={data.country.code}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
          <p>The country code you've entered does not exist in our database.</p>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-primary/10 text-primary rounded-full p-2">
        <Icon className="h-4 w-4 " />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
