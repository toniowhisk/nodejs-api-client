import { AbstractGraphQLClient } from '../abstractGraphQLClient';
import {
  GetPartnerData,
  GetPartnerDataType,
  GetPartnerDataGraphQLResultType,
} from './entities/getPartnerData';
import {
  GetCustomerData,
  GetCustomerDataType,
  GetCustomerDataGraphQLResultType,
} from './entities/getCustomerData';
import {
  GetCustomerAccountData,
  GetCustomerAccountDataType,
  GetCustomerAccountDataGraphQLResultType,
} from './entities/getCustomerAccountData';
import { PublicApiClientException } from '../exception';
import { SecurityScoreQueries } from './types/queryArguments';
import {
  GetPartnerDataQuery,
  GetCustomerDataQuery,
  GetCustomerAccountDataQuery,
} from './types/securityScoreGraphQLQueries';

export class SecurityScoreGraphQLClient extends AbstractGraphQLClient {
  /**
   * The base path of the API
   */
  protected basePath = 'security/';

  /**
   * The Path of graphql catalog API
   */
  private GRAPHQL = 'graphql/score';

  public async find<GraphQLResponseTypes>(
    request: string,
  ): Promise<GraphQLResponseTypes | null> {
    this.path = this.GRAPHQL;

    try {
      return await this.post<GraphQLResponseTypes>(request);
    } catch (error: any) {
      const exception: PublicApiClientException = this.mapToPublicApiException(
        error,
      );

      const { mustRetry } = await this.handleError(exception);
      if (mustRetry) {
        return await this.post<GraphQLResponseTypes>(request);
      }
    }

    return null;
  }

  public async getPartnerData(
    getPartnerDataQuery: GetPartnerDataQuery,
  ): Promise<GetPartnerDataType | null> {
    const queryStr: string = this.stringifyQuery(getPartnerDataQuery);

    const getPartnerDataResult: GetPartnerDataGraphQLResultType | null = await this.find<GetPartnerDataGraphQLResultType>(
      queryStr,
    );

    if (getPartnerDataResult) {
      return new GetPartnerData(
        getPartnerDataResult[SecurityScoreQueries.GET_PARTNER_DATA],
      ).toJSON();
    }

    return null;
  }

  public async getCustomerData(
    getCustomerDataQuery: GetCustomerDataQuery,
  ): Promise<GetCustomerDataType | null> {
    const queryStr: string = this.stringifyQuery(getCustomerDataQuery);

    const getCustomerDataResult: GetCustomerDataGraphQLResultType | null = await this.find<GetCustomerDataGraphQLResultType>(
      queryStr,
    );

    if (getCustomerDataResult) {
      return new GetCustomerData(
        getCustomerDataResult[SecurityScoreQueries.GET_CUSTOMER_DATA],
      ).toJSON();
    }

    return null;
  }

  public async getCustomerAccountData(
    getCustomerAccountDataQuery: GetCustomerAccountDataQuery,
  ): Promise<GetCustomerAccountDataType | null> {
    const queryStr: string = this.stringifyQuery(getCustomerAccountDataQuery);

    const getCustomerAccountDataResult: GetCustomerAccountDataGraphQLResultType | null = await this.find<GetCustomerAccountDataGraphQLResultType>(
      queryStr,
    );

    if (getCustomerAccountDataResult) {
      return new GetCustomerAccountData(
        getCustomerAccountDataResult[
          SecurityScoreQueries.GET_CUSTOMER_ACCOUNT_DATA
        ],
      ).toJSON();
    }

    return null;
  }
}
