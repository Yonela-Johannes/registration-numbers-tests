// init registration
import RegistrationNo from '../regNoTest.js'
// importing mocha
mocha.setup('bdd');
let assert = chai.assert;
mocha.checkLeaks();
mocha.run();
// init tests
describe("Registration Numbers Function", () => {
    // registration number input check senarios
    describe("Registration Number and validation", () => {
        const registr = RegistrationNo()
        it('should get correct number', () => {
            assert.equal(registr.setRegNumber("CA 123-147"), registr.getRegNumber())
        });
        it("should return false for ca", () => {
            assert.equal(registr.validateRegistrationNr("ca"), false)
        })
        it("should return false for ca-123", () => {
            assert.equal(registr.validateRegistrationNr("ca123"), false)
        })
        it("should return false for caa", () => {
            assert.equal(registr.validateRegistrationNr("caa"), false)
        })
        it("should return false for ca-123-456", () => {
            assert.equal(registr.validateRegistrationNr("ca123-456"), false)
        })
        it("should return false for cape town", () => {
            console.log()
            assert.equal(registr.validateRegistrationNr("cape town"), false)
        })
        it("should return true for ca-123-456", () => {
            assert.equal(registr.validateRegistrationNr("ca-123-456"), true)
        })
        it("should return true for cf 123-456", () => {
            assert.equal(registr.validateRegistrationNr("cf 123-456"), true)
        })
        it("should return true for cf 123", () => {
            assert.equal(registr.validateRegistrationNr("cf 123"), true)
        })
        it("should return true for cf-123", () => {
            assert.equal(registr.validateRegistrationNr("cf-123"), true)
        })
        it("should return true for ct-12-456", () => {
            assert.equal(registr.validateRegistrationNr("ct-12-456"), true)
        })
        it("should return true for cl-124-45", () => {
            assert.equal(registr.validateRegistrationNr("cl-124-45"), true)
        })
    })
    // check if its correct prefix
    describe("Registration number Prefix'es", () => {
        it('should return all valid registration numbers', () => {
            const registr = RegistrationNo()
            const data = ['CA', 'CAA', 'WP', 'CY', 'CF', 'CN', 'CL', 'CK', 'CW', 'CT', 'CAW', 'CF', 'CJ']
            assert.deepEqual(data, registr.regisAbreviations())
        })
    })
    describe("should be Wester Cape prefix", () => {
        it('should return false for GP', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("GP")
            assert.equal(false, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return false for EC', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("EC")
            assert.equal(false, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return false for CAF', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("EAF")
            assert.equal(false, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return false for EL', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("EL")
            assert.equal(false, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return true for WP', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("WP")
            assert.equal(true, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return true for CA', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("CA")
            assert.equal(true, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return true for CAA', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("CAA")
            assert.equal(true, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return true for CF', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("CF")
            assert.equal(true, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return true for CY', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("CY")
            assert.equal(true, registr.checkReg(registr.regisAbreviations()))
        })
        it('should return true if lowercase, cy', () => {
            const registr = RegistrationNo()
            registr.setRegNumber("cy")
            assert.equal(true, registr.checkReg(registr.regisAbreviations()))
        })
    })

    describe("Filter Registration by Town Names", () => {
        it('should return all registrations from Cape Town', () => {
            const registr = RegistrationNo()
            const plates = ['cl 123', 'ca 321', 'cl 456-145', 'ca 456-68', 'wp 987', 'ct 123', 'cw 456-475', 'cy 987', 'cy 654-12', 'cy 98-789', 'ca 321-321', , 'ca 321-123']
            registr.setTownReg('ca', plates)
            registr.getTownReg()
            assert.deepEqual(['ca 321', 'ca 456-68', 'ca 321-321', 'ca 321-123'], registr.getTownReg())
        })
        it('should return all registrations form Stellenbosch', () => {
            const registr = RegistrationNo()
            const plates = ['cl 123', 'ca 321', 'cl 456-145', 'wp 987', 'ct 123', 'cl 466-155', 'cw 456-475', 'cy 987', 'cy 654-12', 'cy 98-789']
            registr.setTownReg('cl', plates)
            assert.deepEqual(['cl 123', 'cl 456-145', 'cl 466-155'], registr.getTownReg())
        })
        it('should return all registrations from Bellville', () => {
            const registr = RegistrationNo()
            const plates = ['cl 123', 'ca 321', 'cl 456-145', 'wp 987', 'ct 123', 'cw 456-475', 'cy 987', 'cy 654-12', 'cy 98-789']
            registr.setTownReg('cy', plates)
            registr.getTownReg()
            assert.deepEqual(['cy 987', 'cy 654-12', 'cy 98-789'], registr.getTownReg())
        })
        it('should return all registrations form Worcester', () => {
            const registr = RegistrationNo()
            const plates = ['cl 123', 'ca 321', 'cw 166-475', 'cl 456-145', 'cw 456-47', 'wp 987', 'ct 123', 'cw 456-475', 'cy 987', 'cy 654-12', 'cy 98-789']
            registr.setTownReg('cw', plates)
            assert.deepEqual(['cw 166-475', 'cw 456-47', 'cw 456-475'], registr.getTownReg())
        })
        it('should return all personalised registrations from Cape Town', () => {
            const registr = RegistrationNo()
            const plates = ['cl 123', 'wp 324-14', 'ca 321', 'cl 456-145', 'wp 987', 'ct 123', 'cw 456-475', 'cy 987', 'cy 654-12', 'cy 98-789', 'wp 987-987']
            registr.setTownReg('wp', plates)
            assert.deepEqual(['wp 324-14', 'wp 987', 'wp 987-987'], registr.getTownReg())
        })
        it('should return no registrations for emty string', () => {
            const registr = RegistrationNo()
            const plates = ['cl 123', 'ca 321', 'cl 456-145', 'wp 987', 'ct 123', 'cw 456-475', 'cy 987', 'cy 654-12', 'cy 98-789']
            registr.setTownReg('', plates)
            assert.deepEqual([], registr.getTownReg())
        })
    })
})