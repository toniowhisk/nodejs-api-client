import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { AbstractGraphQLClient } from '../../src/abstractGraphQLClient';
import {
  GetPartnerDataType,
  GetCustomerDataType,
  GetCustomerAccountDataType,
  SecurityScoreGraphQLClient,
} from '../../src/securityScore';
import {
  Hooks,
  HttpExceptionHandler,
  HandleHttpExceptionOutput,
} from '../../src/exception/exception-handlers';
import { PublicApiClientException } from '../../src/exception';
import * as SecurityScoreQueryMock from './mocks/securityScoreQueries.mocks';

describe('SecurityScoreGraphQLClient', () => {
  const client = new SecurityScoreGraphQLClient();
  let graphQLClient: SinonStub;

  beforeEach(() => {
    graphQLClient = sinon.stub(AbstractGraphQLClient.prototype, <any>'post');
  });

  afterEach(() => {
    graphQLClient.restore();
  });

  describe('find', () => {
    it('makes a graphql POST request on the specified URL and handle exception', async () => {
      const query = '{getPartnerData { avgCurrentScore}}';

      graphQLClient.rejects(new Error('unexpected error'));

      const result: GetPartnerDataType | null = await client.find<GetPartnerDataType>(
        query,
      );

      sinon.assert.calledOnceWithExactly(graphQLClient, query);

      expect(result).to.be.null;
    });

    it('makes a graphql POST request on the specified URL twice', async () => {
      const query = '{getPartnerData { avgCurrentScore}}';

      const expectedResult = { avgCurrentScore: 50.2 };

      const exceptionHandler: HttpExceptionHandler = {
        handle(
          error: PublicApiClientException,
          hooks: Hooks,
        ): Promise<HandleHttpExceptionOutput> {
          return Promise.resolve({
            mustRetry: true,
            error,
            hooks,
          });
        },

        getHandledHttpStatuses(): number[] {
          return [403];
        },
      };

      client.registerHttpExceptionHandler(exceptionHandler);

      graphQLClient
        .onCall(0)
        .rejects({ message: 'unexpected error', response: { status: 403 } });

      graphQLClient.onCall(1).resolves(expectedResult);

      const result: GetPartnerDataType | null = await client.find<GetPartnerDataType>(
        query,
      );

      sinon.assert.calledTwice(graphQLClient);

      expect(result).to.be.equals(expectedResult);
    });
  });

  describe('getPartnerData', () => {
    it('makes a graphql POST request on the specified URL getPartnerData', async () => {
      const expectedResult = {
        getPartnerData: {
          avgCurrentScore: 6.5,
          period: {
            from: '2023-01',
            to: '2023-02',
          },
          endCustomersAgg: {
            customers: {
              data: [
                {
                  date: '2023-04-02',
                  accounts: 3,
                  avgCurrentScore: 45.53,
                  failed: 0,
                  passed: 1,
                  subscriptionReferences: 'arrowsphere-1',
                },
                {
                  date: '2023-04-01',
                  accounts: 3,
                  avgCurrentScore: 46.53,
                  failed: 0,
                  passed: 1,
                  subscriptionReferences: 'arrowsphere-1',
                },
              ],
              last: {
                date: '2023-04-02',
                accounts: 3,
                avgCurrentScore: 45.53,
                failed: 0,
                passed: 1,
                subscriptionReferences: 'arrowsphere-1',
              },
              name: 'arrowsphere',
              progression: 0.5,
              reference: 'XSP0',
            },
          },
        },
      };

      graphQLClient.resolves(expectedResult);

      const result: GetPartnerDataType | null = await client.getPartnerData(
        SecurityScoreQueryMock.GET_PARTNER_DATA_QUERY,
      );

      expect(result?.avgCurrentScore).to.be.equals(
        expectedResult.getPartnerData.avgCurrentScore,
      );

      expect(result?.period).to.be.equals(expectedResult.getPartnerData.period);
      expect(result?.endCustomersAgg).to.be.equals(
        expectedResult.getPartnerData.endCustomersAgg,
      );

      sinon.assert.calledOnceWithExactly(
        graphQLClient,
        SecurityScoreQueryMock.GET_PARTNER_DATA_GQL,
      );
    });

    it('makes a graphql POST request on the specified URL getPartnerData must return null', async () => {
      graphQLClient.resolves(null);

      const result: GetPartnerDataType | null = await client.getPartnerData(
        SecurityScoreQueryMock.GET_PARTNER_DATA_QUERY,
      );

      expect(result).to.be.null;

      sinon.assert.calledOnceWithExactly(
        graphQLClient,
        SecurityScoreQueryMock.GET_PARTNER_DATA_GQL,
      );
    });
  });

  describe('getCustomerData', () => {
    it('makes a graphql POST request on the specified URL getCustomerData', async () => {
      const expectedResult = {
        getCustomerData: {
          avgCurrentScore: 6.5,
          period: {
            from: '2023-01',
            to: '2023-02',
          },
          accountsAgg: {
            accounts: [
              {
                accountRef: 'XSP0',
                progression: null,
                data: [],
              },
            ],
          },
        },
      };

      graphQLClient.resolves(expectedResult);

      const result: GetCustomerDataType | null = await client.getCustomerData(
        SecurityScoreQueryMock.GET_CUSTOMER_DATA_QUERY,
      );

      expect(result?.avgCurrentScore).to.be.equals(
        expectedResult.getCustomerData.avgCurrentScore,
      );

      expect(result?.period).to.be.equals(
        expectedResult.getCustomerData.period,
      );
      expect(result?.accountsAgg).to.be.equals(
        expectedResult.getCustomerData.accountsAgg,
      );

      sinon.assert.calledOnceWithExactly(
        graphQLClient,
        SecurityScoreQueryMock.GET_CUSTOMER_DATA_GQL,
      );
    });

    it('makes a graphql POST request on the specified URL getCustomerData must return null', async () => {
      graphQLClient.resolves(null);

      const result: GetCustomerDataType | null = await client.getCustomerData(
        SecurityScoreQueryMock.GET_CUSTOMER_DATA_QUERY,
      );

      expect(result).to.be.null;

      sinon.assert.calledOnceWithExactly(
        graphQLClient,
        SecurityScoreQueryMock.GET_CUSTOMER_DATA_GQL,
      );
    });
  });

  describe('getCustomerAccountData', () => {
    it('makes a graphql POST request on the specified URL getCustomerAccountData', async () => {
      const expectedResult = {
        getCustomerAccountData: {
          avgCurrentScore: 6.5,
          period: {
            from: '2023-01',
            to: '2023-02',
          },
          standardsAgg: {
            standards: [
              {
                name: 'arrowsphere',
                progression: null,
                data: [],
              },
            ],
          },
        },
      };

      graphQLClient.resolves(expectedResult);

      const result: GetCustomerAccountDataType | null = await client.getCustomerAccountData(
        SecurityScoreQueryMock.GET_CUSTOMER_ACCOUNT_DATA_QUERY,
      );

      expect(result?.avgCurrentScore).to.be.equals(
        expectedResult.getCustomerAccountData.avgCurrentScore,
      );

      expect(result?.period).to.be.equals(
        expectedResult.getCustomerAccountData.period,
      );
      expect(result?.standardsAgg).to.be.equals(
        expectedResult.getCustomerAccountData.standardsAgg,
      );

      sinon.assert.calledOnceWithExactly(
        graphQLClient,
        SecurityScoreQueryMock.GET_CUSTOMER_ACCOUNT_DATA_GQL,
      );
    });

    it('makes a graphql POST request on the specified URL getCustomerAccountData must return null', async () => {
      graphQLClient.resolves(null);

      const result: GetCustomerAccountDataType | null = await client.getCustomerAccountData(
        SecurityScoreQueryMock.GET_CUSTOMER_ACCOUNT_DATA_QUERY,
      );

      expect(result).to.be.null;

      sinon.assert.calledOnceWithExactly(
        graphQLClient,
        SecurityScoreQueryMock.GET_CUSTOMER_ACCOUNT_DATA_GQL,
      );
    });
  });
});
