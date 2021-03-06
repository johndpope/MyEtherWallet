import Big from 'bignumber.js';
import ERC20 from 'libs/erc20';
import abi from 'ethereumjs-abi';
const MEW_ADDRESS = '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8';

describe('ERC20', () => {
  describe('balanceOf', () => {
    it('should generate the correct data for checking the balance', () => {
      const data = ERC20.balanceOf(MEW_ADDRESS);
      expect(data).toBe(
        '0x70a082310000000000000000000000007cb57b5a97eabe94205c07890be4c1ad31e486a8'
      );
    });
  });

  describe('transfer', () => {
    it('should generate the correct data for a transfer', () => {
      // Test data generated by sending 1 GNT to the MEW address
      const value = new Big('1').times(new Big(10).pow(18));
      const data = ERC20.transfer(MEW_ADDRESS, value);
      expect(data).toBe(
        '0xa9059cbb0000000000000000000000007cb57b5a97eabe94205c07890be4c1ad31e486a80000000000000000000000000000000000000000000000000de0b6b3a7640000'
      );
    });
  });

  describe('$transfer', () => {
    // Test data generated by sending 0.001 GNT to the MEW address
    it('should return the correct transaction given some data', () => {
      const tx = ERC20.$transfer(
        '0xa9059cbb0000000000000000000000007cb57b5a97eabe94205c07890be4c1ad31e486a800000000000000000000000000000000000000000000000000038d7ea4c68000'
      );

      expect(tx.to).toBe(MEW_ADDRESS);
      expect(tx.value).toBe(
        new Big('0.001').times(new Big(10).pow(18)).toString()
      );
    });
  });
});
