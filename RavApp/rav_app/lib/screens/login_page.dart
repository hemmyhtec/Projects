import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:rav_app/common/theme_helper.dart';
import 'package:rav_app/screens/profile_page.dart';
import 'package:rav_app/screens/widget/header_widget.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

double _headerHeight = 250;
Key _formKey = GlobalKey<FormState>();

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: _headerHeight,
              child: HeaderWidget(_headerHeight, true, Icons.verified_user),
            ),
            SafeArea(
                child: Container(
                    padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                    margin: const EdgeInsets.fromLTRB(20, 10, 20, 10),
                    child: Column(
                      children: [
                        const Text('Heloo',
                            style: TextStyle(
                                fontSize: 60, fontWeight: FontWeight.bold)),
                        const Text('Signin into your Account',
                            style: TextStyle(color: Colors.grey)),
                        const SizedBox(height: 30.0),
                        Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              TextField(
                                  decoration: ThemeHelper().textInputDecpration(
                                      'Username', 'Enter your Username')),
                              const SizedBox(height: 30.0),
                              TextField(
                                  obscureText: true,
                                  decoration: ThemeHelper().textInputDecpration(
                                      'Password', 'Enter a Password')),
                              const SizedBox(height: 15.0),
                              Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(10, 0, 10, 20),
                                  alignment: Alignment.topRight,
                                  child: const Text('Forget Password?')),
                              Container(
                                  decoration: ThemeHelper()
                                      .buttonBoxDecoration(context),
                                  child: ElevatedButton(
                                    style: ThemeHelper().buttonStyle(),
                                    child: Padding(
                                      padding: const EdgeInsets.fromLTRB(
                                          40, 10, 40, 10),
                                      child: Text(
                                        'Sign-In'.toUpperCase(),
                                        style: const TextStyle(
                                            fontSize: 20,
                                            fontWeight: FontWeight.bold,
                                            color: Colors.white),
                                      ),
                                    ),
                                    onPressed: () {
                                      Navigator.pushReplacement(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  const ProfilePage()));
                                    },
                                  )),
                              Container(
                                  margin:
                                      const EdgeInsets.fromLTRB(10, 20, 10, 20),
                                  child: const Text(
                                      'Don\'t have an account? Create')),
                            ],
                          ),
                        )
                      ],
                    )))
          ],
        ),
      ),
    );
  }
}
