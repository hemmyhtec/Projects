import 'package:flutter/material.dart';

import 'screens/splash_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rav',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: "Montserrat"
      ),
      home: const SplashSceen(),
    );
  }
}
