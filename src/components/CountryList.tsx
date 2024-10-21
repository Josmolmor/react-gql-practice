import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Country } from '@/types';
import { MapPin, Flag, Search } from 'lucide-react';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import globeAnimation from '../lottie/globe.json';
import emptyAnimation from '../lottie/empty.json';
import ListSkeleton from './ListSkeleton';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      capital
      code
      emoji
    }
  }
`;

export default function CountryList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState(searchParams.get('q') ?? '');
  const debouncedSearchTerm = useDebounce(inputValue, 300);

  const { loading, error, data } = useQuery<{
    countries: Pick<Country, 'code' | 'name' | 'emoji' | 'capital'>[];
  }>(GET_COUNTRIES, {
    variables: {},
    fetchPolicy: 'cache-and-network', // Use cache first, fetch in the background
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [filteredCountries, setFilteredCountries] = useState<
    Pick<Country, 'code' | 'name' | 'emoji' | 'capital'>[]
  >([]);

  useEffect(() => {
    if (data) {
      setFilteredCountries(
        data.countries.filter(
          (country) =>
            country.name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            country.capital
              ?.toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            country.code
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
        )
      );
    }
    if (debouncedSearchTerm) {
      setSearchParams({
        q: debouncedSearchTerm,
      });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  }, [debouncedSearchTerm, data, setSearchParams, searchParams]);

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <div className="flex gap-4 mb-4 items-center justify-between">
        <h1 className="text-4xl font-bold">Country list</h1>
        <Lottie
          animationData={globeAnimation}
          loop={true}
          className="h-20 w-20"
        />
      </div>

      <div className="mb-6 relative">
        <Input
          type="search"
          placeholder="Search countries..."
          onChange={handleSearchChange}
          value={inputValue}
          className="pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
      </div>

      {loading && <ListSkeleton />}

      {error && (
        <div className="text-center text-red-500">
          <p>Error: {error.message}</p>
        </div>
      )}

      {data && (
        <>
          <p className="mb-4 text-muted-foreground">
            Showing {filteredCountries.length} of {data.countries.length}{' '}
            countries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <a
                key={country.code}
                href={`/country/${country.code}`}
                className="rounded-xl"
              >
                <Card className="hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 overflow-hidden group h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                      <span className="truncate" title={country.name}>
                        {country.name}
                      </span>
                      <span className="">{country.emoji}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 flex gap-4 flex-wrap">
                    <p className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4 text-primary" />
                      {country.capital || 'N/A'}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <Flag className="mr-2 h-4 w-4 text-primary" />
                      {country.code}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </>
      )}

      {data && !loading && inputValue && filteredCountries.length === 0 && (
        <div className="text-center text-muted-foreground">
          <Lottie
            animationData={emptyAnimation}
            loop={true}
            className="h-64 w-64 m-auto"
          />
          <p>No countries found matching your search.</p>
        </div>
      )}
    </div>
  );
}
