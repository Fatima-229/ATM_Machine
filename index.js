#!/usr/bin/env node
import inquirer from "inquirer";
let userId = "";
const userPin = 3456;
let current_balance = 50000;
// ASKING USERNAME
const userName_ans = await inquirer.prompt({
  name: "user_name",
  type: "input",
  message: "Please enter your name! ",
});
if (
  userName_ans.user_name !== undefined &&
  userName_ans.user_name !== null &&
  userName_ans.user_name !== ""
) {
  userId = userName_ans.user_name;
}
//  MAIN FUNCTION
async function atm_func() {
  console.log(" Welcome to ATM !");
  const pin_ans = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: "Enter your 4-Digit pin code.",
  });
  if (pin_ans.pin === userPin) {
    console.log(`Hello ${userId}, welcome to the ATM.`);
    console.log(` Your Current Balance is: ${current_balance}`);
    let anotherTransaction = true;
    while (anotherTransaction) {
      const choice = await inquirer.prompt([
        {
          type: "list",
          name: "options",
          message: "Please select an option:",
          choices: [
            "Deposit Amount",
            "Cash Withdraw",
            "Balance Check",
            "Fast Cash",
          ],
        },
      ]);
      //  DEPOSIT AMOUNT
      if (choice.options === "Deposit Amount") {
        const Deposit_ans = await inquirer.prompt({
          name: "deposit_amount",
          type: "number",
          message: "Enter your Amount to Deposit: ",
        });
        if (Deposit_ans.deposit_amount > 0) {
          current_balance = current_balance + Deposit_ans.deposit_amount;
          console.log(` Your Current Balance is: ${current_balance}`);
        } else {
          console.log(`You Entered Invalid Amount.`);
        }
      }
      //  CASH WITHDRAW
      else if (choice.options === "Cash Withdraw") {
        const Withdraw_ans = await inquirer.prompt([
          {
            type: "number",
            name: "amount",
            message: "Enter the amount to withdraw:",
          },
        ]);
        if (Withdraw_ans.amount < current_balance && Withdraw_ans.amount > 0) {
          console.log(`Withdrawn $${Withdraw_ans.amount} from your account.`);
          current_balance = current_balance - Withdraw_ans.amount;
          console.log(` Your Current Balance is: $${current_balance}`);
        } else {
          console.log(`Insufficient balance or Invalid Amount.`);
        }
      }
      // BALANCE CHECK
      else if (choice.options === "Balance Check") {
        console.log(`Your Current Balance is: $${current_balance}`);
      }
      //  FAST CASH
      else if (choice.options === "Fast Cash") {
        const fast_cash = await inquirer.prompt([
          {
            type: "list",
            name: "options",
            message: "Please select an option:",
            choices: [
              "- Withdraw: $100",
              "- Withdraw: $500",
              "- Withdraw: $1000",
            ],
          },
        ]);
        if (current_balance >= 100) {
          if (fast_cash.options === "- Withdraw: $100") {
            console.log(`Withdrawn $100 from your account.`);
            current_balance = current_balance - 100;
            console.log(`Your Current Balance is: $${current_balance}`);
          } else if (fast_cash.options === "- Withdraw: $500") {
            console.log(`Withdrawn $500 from your account.`);
            current_balance = current_balance - 500;
            console.log(`Your Current Balance is: $${current_balance}`);
          } else if (fast_cash.options === "- Withdraw: $1000") {
            console.log(`Withdrawn $1000 from your account.`);
            current_balance = current_balance - 1000;
            console.log(`Your Current Balance is: $${current_balance}`);
          }
        } else {
          console.log(`Insufficient balance or Invalid Amount.`);
        }
      }
      const confirmation_ans = await inquirer.prompt({
        type: "confirm",
        name: "user_confirmation",
        message: "Do you want to do another transaction.? ",
      });
      if (confirmation_ans.user_confirmation === false) {
        anotherTransaction = false;
      }
    }
    console.log("Thank you for using the ATM!");
    process.exit();
  }
}
atm_func();
